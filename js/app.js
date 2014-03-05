$(function(){
    var SingAppView = function(){
        this.navCollapseTimeout = 1000;
        this.$sidebar = $('#sidebar');
        this.$contentWrap = $('.content-wrap');
        this.loaderTemplate = _.template($('#loader-template').html());
        this.settings = window.SingSettings;
        this.pageLoadCallbacks = {};
        this.resizeCallbacks = {};

        this.$sidebar.on('mouseover', $.proxy(this.expandNavigation, this));
        this.$sidebar.on('mouseout', $.proxy(this.collapseNavigation, this));

        this.checkNavigationState();
        this.initOnResize();

        $(document).pjax('#sidebar a', '#content', {
            fragment: '#content',
            replace: true,
            type: 'POST' //prevents caching
        });
        $(document).on('pjax:start', $.proxy(this.changeActiveNavigationItem, this));
        $(document).on('pjax:send', $.proxy(this.showLoader, this));
        $(document).on('pjax:complete', $.proxy(this.hideLoader, this));
        $(document).on('pjax:success', $.proxy(this.loadScripts, this));
        $(document).on('pjax:end', $.proxy(this.pageLoaded, this));
    };

    SingAppView.prototype.checkNavigationState = function(){
        if (this.settings.get('nav-collapsed') === true){
            var view = this;
            setTimeout(function(){
                view.collapseNavigation();
            }, this.navCollapseTimeout);
        }
    };

    SingAppView.prototype.initOnResize = function(){
        var resizeTimeout,
            view = this;

        $(window).resize(function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function(){
                view._runPageCallbacks(view.resizeCallbacks);
            }, 200);
        });
    };

    SingAppView.prototype.collapseNavigation = function(){
        //$('body').addClass('nav-collapsed');
    };

    SingAppView.prototype.expandNavigation = function(){
        //$('body').removeClass('nav-collapsed');
    };

    SingAppView.prototype.changeActiveNavigationItem = function(event, xhr, options){
        this.$sidebar.find('li.active').removeClass('active');

        this.$sidebar.find('a[href*="' + this.extractPageName(options.url) + '"]').closest('li').addClass('active');
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
     * Runs maximum once in 200 milliseconds.
     * @param fn A function to execute
     */
    SingAppView.prototype.onResize = function(fn){
        this._addPageCallback(this.resizeCallbacks, fn);
    };

    /**
     * Specify a function to execute when page was reloaded with pjax.
     * @param fn A function to execute
     */
    SingAppView.prototype.onPageLoad = function(fn){
        this._addPageCallback(this.pageLoadCallbacks, fn);
    };

    SingAppView.prototype.pageLoaded = function(){
        this._runPageCallbacks(this.pageLoadCallbacks);
    };

    SingAppView.prototype._addPageCallback = function(callbacks, fn){
        var pageName = this.extractPageName(location.href);
        if (!callbacks[pageName]){
            callbacks[pageName] = [];
        }
        callbacks[pageName].push(fn);
    };

    SingAppView.prototype._runPageCallbacks = function(callbacks){
        var pageName = this.extractPageName(location.href);
        if (callbacks[pageName]){
            _(callbacks[pageName]).each(function(fn){
                fn();
            })
        }
    };

    SingAppView.prototype.loadScripts = function(event, data, status, xhr, options){
        var $bodyContents = $($.parseHTML(data.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0], document, true)),
            $scripts = $bodyContents.filter('script[src]').add($bodyContents.find('script[src]')),
            $existingScripts = $('script[src]');

        $scripts.each(function() {
            var src = this.src;
            var matchedScripts = $existingScripts.filter(function() {
                //noinspection JSPotentiallyInvalidUsageOfThis
                return this.src === src;
            });
            if (matchedScripts.length) return;

            var script = document.createElement('script');
            script.src = $(this).attr('src');
            document.body.appendChild(script);
        })
    };

    SingAppView.prototype.extractPageName = function(url){
        //credit: http://stackoverflow.com/a/8497143/1298418
        return url.split('#')[0].substring(url.lastIndexOf("/") + 1)
    };


    window.SingApp = new SingAppView();
});