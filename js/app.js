/**
 * Whether to use pjax page swithing
 * @type {boolean}
 */
window.PJAX_ENABLED = true;
/**
 * Whether to print some log information
 * @type {boolean}
 */
window.DEBUG = true;

$(function(){

    /**
     * Main app class that handles page switching, async script loading, resize & pageLoad callbacks.
     * @constructor
     */
    var SingAppView = function(){

        this.pjaxEnabled = window.PJAX_ENABLED;
        this.debug = window.DEBUG;
        this.navCollapseTimeout = 1000;
        this.$sidebar = $('#sidebar');
        this.$contentWrap = $('.content-wrap');
        this.loaderTemplate = _.template($('#loader-template').html());
        this.settings = window.SingSettings;
        this.pageLoadCallbacks = {};
        this.resizeCallbacks = {};
        this.loading = false;

        this._resetResizeCallbacks();
        this._initOnResizeCallbacks();

        this.$sidebar.on('mouseenter', $.proxy(this.expandNavigation, this));
        this.$sidebar.on('mouseleave', $.proxy(this.collapseNavigation, this));

        this.checkNavigationState();
        this._initOnResizeCallbacks();

        if (this.pjaxEnabled){
            this.$sidebar.find('a:not(.accordion-toggle):not([data-no-pjax])').on('click', $.proxy(this._checkLoading, this));
            $(document).pjax('#sidebar a', '#content', {
                fragment: '#content',
                type: 'POST' //prevents caching
            });
            $(document).on('pjax:start', $.proxy(this._changeActiveNavigationItem, this));
            $(document).on('pjax:start', $.proxy(this._resetResizeCallbacks, this));
            $(document).on('pjax:send', $.proxy(this.showLoader, this));
            $(document).on('pjax:success', $.proxy(this._loadScripts, this));
            //custom event which fires when all scripts are actually loaded
            $(document).on('sing-app:loaded', $.proxy(this._loadingFinished, this));
            $(document).on('sing-app:loaded', $.proxy(this.hideLoader, this));
            $(document).on('pjax:end', $.proxy(this.pageLoaded, this));
            window.onerror = $.proxy(this._logErrors, this);
        }
    };

    /**
     * Initiates an array of throttle onResize callbacks.
     * @private
     */
    SingAppView.prototype._initOnResizeCallbacks = function(){
        var resizeTimeout,
            view = this;

        $(window).resize(function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function(){
                view._runPageCallbacks(view.resizeCallbacks);
            }, 100);
        });
    };

    SingAppView.prototype._resetResizeCallbacks = function(){
        this.resizeCallbacks = {};
    };

    /**
     * Collapses navigation if collapse-nav local storage option is set to true
     */
    SingAppView.prototype.checkNavigationState = function(){
        if (this.settings.get('collapse-nav') === true){
            var view = this;
            setTimeout(function(){
                view.collapseNavigation();
            }, this.navCollapseTimeout);
        }
    };

    SingAppView.prototype.collapseNavigation = function(){
        $('body').addClass('nav-collapsed');
    };

    SingAppView.prototype.expandNavigation = function(){
        $('body').removeClass('nav-collapsed');
    };

    /**
     * Changes active navigation item depending on current page.
     * Should be executed before page load
     * @param event
     * @param xhr
     * @param options
     * @private
     */
    SingAppView.prototype._changeActiveNavigationItem = function(event, xhr, options){
        this.$sidebar.find('li.active').removeClass('active');

        this.$sidebar.find('a[href*="' + this.extractPageName(options.url) + '"]').each(function(){
            if (this.href === options.url){
                $(this).closest('li').addClass('active')
                    .closest('.panel').addClass('active');
            }
        });
    };

    SingAppView.prototype.showLoader = function(){
        var view = this;
        this.showLoaderTimeout = setTimeout(function(){
            view.$contentWrap.append(view.loaderTemplate());
            setTimeout(function(){
                view.$contentWrap.find('.loader-wrap').removeClass('hiding');
            }, 0)
        }, 100);
    };

    SingAppView.prototype.hideLoader = function(){
        clearTimeout(this.showLoaderTimeout);
        var $loaderWrap = this.$contentWrap.find('.loader-wrap');
        $loaderWrap.addClass('hiding');
        $loaderWrap.one($.support.transition.end, function () {
            $loaderWrap.remove();
        }).emulateTransitionEnd(200)
    };

    /**
     * Specify a function to execute when window was resized.
     * Runs maximum once in 100 milliseconds (throttle).
     * @param fn A function to execute
     */
    SingAppView.prototype.onResize = function(fn){
        this._addPageCallback(this.resizeCallbacks, fn);
    };

    /**
     * Specify a function to execute when a page was reloaded with pjax.
     * @param fn A function to execute
     */
    SingAppView.prototype.onPageLoad = function(fn){
        this._addPageCallback(this.pageLoadCallbacks, fn);
    };

    /**
     * Runs page loaded callbacks
     */
    SingAppView.prototype.pageLoaded = function(){
        this._runPageCallbacks(this.pageLoadCallbacks);
    };

    /**
     * Convenient private method to add app callback depending on current page.
     * @param callbacks
     * @param fn callback to execute
     * @private
     */
    SingAppView.prototype._addPageCallback = function(callbacks, fn){
        var pageName = this.extractPageName(location.href);
        if (!callbacks[pageName]){
            callbacks[pageName] = [];
        }
        callbacks[pageName].push(fn);
    };

    /**
     * Convenient private method to run app callbacks depending on current page.
     * @param callbacks
     * @private
     */
    SingAppView.prototype._runPageCallbacks = function(callbacks){
        var pageName = this.extractPageName(location.href);
        if (callbacks[pageName]){
            _(callbacks[pageName]).each(function(fn){
                fn();
            })
        }
    };

    /**
     * Parses entire body response in order to find & execute script tags.
     * This has to be done because it's only .content attached to the page after ajax request.
     * Usually content does not contain all scripts required from page loading, so need to additionally extract them from body response.
     * @param event
     * @param data
     * @param status
     * @param xhr
     * @param options
     * @private
     */
    SingAppView.prototype._loadScripts = function(event, data, status, xhr, options){
        var $bodyContents = $($.parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0], document, true)),
            $scripts = $bodyContents.filter('script[src]').add($bodyContents.find('script[src]')),
            $templates = $bodyContents.filter('script[type="text/template"]').add($bodyContents.find('script[type="text/template"]')),
            $existingScripts = $('script[src]'),
            $existingTemplates = $('script[type="text/template"]');

        //append templates first as they are used by scripts
        $templates.each(function() {
            var id = this.id;
            var matchedTemplates = $existingTemplates.filter(function() {
                //noinspection JSPotentiallyInvalidUsageOfThis
                return this.id === id;
            });
            if (matchedTemplates.length) return;

            var script = document.createElement('script');
            script.id = $(this).attr('id');
            script.type = $(this).attr('type');
            script.innerHTML = this.innerHTML;
            document.body.appendChild(script);
        });



        //ensure synchronous loading
        var $previous = {
            load: function(fn){
                fn();
            }
        };

        $scripts.each(function() {
            var src = this.src;
            var matchedScripts = $existingScripts.filter(function() {
                //noinspection JSPotentiallyInvalidUsageOfThis
                return this.src === src;
            });
            if (matchedScripts.length) return;

            var script = document.createElement('script');
            script.src = $(this).attr('src');
            $previous.load(function(){
                document.body.appendChild(script);
            });

            $previous = $(script);
        });

        var view = this;
        $previous.load(function(){
            $(document).trigger('sing-app:loaded');
            view.log('scripts loaded.');
        })
    };

    SingAppView.prototype.extractPageName = function(url){
        //credit: http://stackoverflow.com/a/8497143/1298418
        var pageName = url.split('#')[0].substring(url.lastIndexOf("/") + 1).split('?')[0];
        return pageName === '' ? 'index.html' : pageName;
    };

    SingAppView.prototype._checkLoading = function(e){
        var oldLoading = this.loading;
        this.loading = true;
        if (oldLoading){
            this.log('attempt to load page while already loading; preventing.');
            e.preventDefault();
        } else {
            this.log(e.currentTarget.href + ' loading started.');
        }
        //prevent default if already loading
        return !oldLoading;
    };

    SingAppView.prototype._loadingFinished = function(){
        this.loading = false;
    };

    SingAppView.prototype._logErrors = function(){
        var errors = JSON.parse(localStorage.getItem('lb-errors')) || {};
        errors[new Date().getTime()] = arguments;
        localStorage.setItem('sing-errors', JSON.stringify(errors));
    };

    SingAppView.prototype.log = function(message){
        if (this.debug){
            console.log(message
                    + " - " + arguments.callee.caller.toString().slice(0, 30).split('\n')[0]
                    + " - " + this.extractPageName(location.href)
            );
        }
    };


    window.SingApp = new SingAppView();

    SingApp.collapseNavigation();

    initAppPlugins();
    initAppFunctions();
    initDemoFunctions();
});

/**
 * Theme functions extracted to independent plugins.
 */
function initAppPlugins(){
    /* ========================================================================
     * Handle transparent inputs
     * ========================================================================
     */
    !function($){
        $('.input-group-transparent, .input-group-no-border').find('.input-group-addon + .form-control').on('blur focus', function(e){
           $(this).parents('.input-group')[e.type=='focus' ? 'addClass' : 'removeClass']('focus');
        });
    }(jQuery);

    /* ========================================================================
     * Ajax Load links, buttons & inputs
     * loads #data-ajax-target from url provided in data-ajax-load
     * ========================================================================
     */
    !function($){
        $(document).on('click change', '[data-ajax-load], [data-ajax-trigger^=change]', function(e){
            var $this = $(this),
                $target = $($this.data('ajax-target'));
            if ($target.length > 0 ){
                e = $.Event('ajax-load:start', {originalEvent: e});
                $this.trigger(e);

                !e.isDefaultPrevented() && $target.load($this.data('ajax-load'), function(){
                    $this.trigger('ajax-load:end');
                });
            }
            return false;
        });
        $(document).on('click', '[data-toggle^=button]', function (e) {
            return $(e.target).find('input').data('ajax-trigger') != 'change';
        })
    }(jQuery);
}

/**
 *
 */
function initAppFunctions(){
    !function($){
        var $loadNotificationsBtn = $('#load-notifications-btn');
        $loadNotificationsBtn.on('ajax-load:start', function (e) {
            $loadNotificationsBtn.button('loading');
        });
        $loadNotificationsBtn.on('ajax-load:end', function () {
            $loadNotificationsBtn.button('reset');
        });

    }(jQuery);
}

/**
 * Demo-only functions. Does not affect core Sing functionality.
 * Should be removed when used in real app.
 */
function initDemoFunctions(){
    !function($){
        $('#load-notifications-btn').on('ajax-load:end', function () {
            setTimeout(function(){
                $('#notifications-list').find('.bg-attention').removeClass('bg-attention');
            }, 10000)
        });
        $('#notifications-toggle').find('input').on('ajax-load:end', function(){
            $('#notifications-list').find('[data-toggle=tooltip]').tooltip();
        })

    }(jQuery);
}