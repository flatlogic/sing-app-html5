/**
 * Whether to use pjax page swithing
 * @type {boolean}
 */
window.PJAX_ENABLED = true;
/**
 * Whether to print some log information
 * @type {boolean}
 */
window.DEBUG = false;

/**
 * Plugins configuration options
 */

/**
 * Setting Widgster's body selector to theme specific
 * @type {string}
 */

$(function(){

    /**
     * Main app class that handles page switching, async script loading, resize & pageLoad callbacks.
     * Events:
     *   sing-app:loaded - fires after pjax request is made and ALL scripts are trully loaded
     *   sing-app:content-resize - fires when .content changes its size (e.g. switching between static & collapsing
     *     navigation states)
     * @constructor
     */
    var SingAppView = function(){

        this.pjaxEnabled = window.PJAX_ENABLED;
        this.debug = window.DEBUG;
        this.navCollapseTimeout = 2500;
        this.$sidebar = $('#sidebar');
        this.$content = $('#content');
        this.$navigationStateToggle = $('#nav-state-toggle');
        this.$navigationCollapseToggle = $('#nav-collapse-toggle');
        this.settings = window.SingSettings;
        this.loading = false;

        this.$sidebar.on('mouseenter', $.proxy(this._sidebarMouseEnter, this));
        this.$sidebar.on('mouseleave', $.proxy(this._sidebarMouseLeave, this));
        /**
         * open navigation in case collapsed sidebar clicked
         */
        $(document).on('click', '.nav-collapsed #sidebar', $.proxy(this.expandNavigation, this));
        //we don't need this cool feature for big boys
        if (Sing.isScreen('xs') || Sing.isScreen('sm')) {
            ('ontouchstart' in window) && this.$content
                .bind('swipeleft', $.proxy(this._contentSwipeLeft, this))
                .bind('swiperight', $.proxy(this._contentSwipeRight, this));
        }

        this.checkNavigationState();

        this.$navigationStateToggle.on('click', $.proxy(this.toggleNavigationState, this));
        this.$navigationCollapseToggle.on('click', $.proxy(this.toggleNavigationCollapseState, this));

        /* reimplementing bs.collapse data-parent here as we don't want to use BS .panel*/
        this.$sidebar.find('.collapse').on('show.bs.collapse', function(e){
            // execute only if we're actually the .collapse element initiated event
            // return for bubbled events
            if (e.target != e.currentTarget) return;

            var $triggerLink = $(this).prev('[data-toggle=collapse]');
            $($triggerLink.data('parent')).find('.collapse.show').not($(this)).collapse('hide');
        })
            /* adding additional classes to navigation link li-parent for several purposes. see navigation styles */
            .on('show.bs.collapse', function(e){
                // execute only if we're actually the .collapse element initiated event
                // return for bubbled events
                if (e.target != e.currentTarget) return;

                $(this).closest('li').addClass('open');
            }).on('hide.bs.collapse', function(e){
                // execute only if we're actually the .collapse element initiated event
                // return for bubbled events
                if (e.target != e.currentTarget) return;

                $(this).closest('li').removeClass('open');
            });
    };

    /**
     * Collapses navigation if nav-static local storage option is set to false
     */
    SingAppView.prototype.checkNavigationState = function(){
        if (this.isNavigationStatic()){
            this.staticNavigationState();
            if (Sing.isScreen('md') || Sing.isScreen('sm') || Sing.isScreen('xs')){
                this.collapseNavigation();
            }
        } else {
            if (Sing.isScreen('lg') || Sing.isScreen('xl')){
                var view = this;
                setTimeout(function(){
                    view.collapseNavigation();
                }, this.navCollapseTimeout);
            } else {
                this.collapseNavigation();
            }
        }
    };

    /**
     * Expands or collapses navigation. Valid only for collapsing navigation state
     */
    SingAppView.prototype.toggleNavigationCollapseState = function(){
        if ($('body').is('.nav-collapsed')){
            this.expandNavigation();
        } else {
            this.collapseNavigation();
        }
    };

    SingAppView.prototype.collapseNavigation = function(){
        //this method only makes sense for non-static navigation state
        if (this.isNavigationStatic() && (Sing.isScreen('lg') || Sing.isScreen('xl'))) return;

        $('body').addClass('nav-collapsed');
        this.$sidebar.find('.collapse.show').collapse('hide')
            .siblings('[data-toggle=collapse]').addClass('collapsed');

    };

    SingAppView.prototype.expandNavigation = function(){
        //this method only makes sense for non-static navigation state
        if (this.isNavigationStatic() && (Sing.isScreen('lg') || Sing.isScreen('xl'))) return;

        $('body').removeClass('nav-collapsed');
        this.$sidebar.find('.active .active').closest('.collapse').collapse('show')
            .siblings('[data-toggle=collapse]').removeClass('collapsed');
    };

    SingAppView.prototype._sidebarMouseEnter = function(){
        if (Sing.isScreen('lg') || Sing.isScreen('xl')){
            this.expandNavigation();
        }
    };

    SingAppView.prototype._sidebarMouseLeave = function(){
        if (Sing.isScreen('lg') || Sing.isScreen('xl')){
            this.collapseNavigation();
        }
    };

    /**
     * Toggles between static and collapsing navigation states.
     * Collapsing - navigation automatically collapse when mouse leaves it and expand when enters.
     * Static - stays always open.
     */
    SingAppView.prototype.toggleNavigationState = function(){
        if (this.isNavigationStatic()){
            this.collapsingNavigationState();
        } else {
            this.staticNavigationState();
        }
        $(window).trigger('sing-app:content-resize');
    };

    /**
     * Turns on static navigation state.
     * Collapsing navigation state - navigation automatically collapse when mouse leaves it and expand when enters.
     * Static navigation state - navigation stays always open.
     */
    SingAppView.prototype.staticNavigationState = function(){
        this.settings.set('nav-static', true).save();
        $('body').addClass('nav-static');
    };

    /**
     * Turns on collapsing navigation state.
     * Collapsing navigation state - navigation automatically collapse when mouse leaves it and expand when enters.
     * Static navigation state - navigation stays always open.
     */
    SingAppView.prototype.collapsingNavigationState = function(){
        this.settings.set('nav-static', false).save();
        $('body').removeClass('nav-static');
        this.collapseNavigation();
    };

    SingAppView.prototype.isNavigationStatic = function(){
        return this.settings.get('nav-static') === true;
    };

    /**
     * Checks whether screen is md or lg and closes navigation if opened
     * @private
     */
    SingAppView.prototype._contentSwipeLeft = function(){
        var self = this;
        //this method only makes sense for small screens + ipad
        setTimeout(function () {
            if (Sing.isScreen('xl')) return;

            if (!$('body').is('.nav-collapsed')){
                self.collapseNavigation();
            }
        })
    };

    /**
     * Checks whether screen is md or lg and opens navigation if closed
     * @private
     */
    SingAppView.prototype._contentSwipeRight = function(){
        //this method only makes sense for small screens + ipad
        if (Sing.isScreen('xl')) return;

        // fixme. this check is bad. I know. breaks loose coupling principle
        // SingApp should not know about some "strange" sidebar chat.
        // check line 726 for more info
        if ($('body').is('.chat-sidebar-opened')) return;

        if ($('body').is('.nav-collapsed')){
            this.expandNavigation();
        }
    };

    window.SingApp = new SingAppView();

    initAppPlugins();
    initDemoFunctions();
});

/**
 * Theme functions extracted to independent plugins.
 */

function initAppPlugins(){
    /* ========================================================================
     * Handle transparent input groups focus
     * ========================================================================
     */
    !function($){

        $.fn.transparentGroupFocus = function () {
            return this.each(function () {
                $(this).find('.input-group-addon + .form-control').on('blur focus', function(e){
                    $(this).parents('.input-group')[e.type=='focus' ? 'addClass' : 'removeClass']('focus');
                });
            })
        };

        $('.input-group-transparent, .input-group-no-border').transparentGroupFocus();
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


    /* ========================================================================
     * Table head check all checkboxes
     * ========================================================================
     */
    !function($){
        $(document).on('click', 'table th [data-check-all]', function () {
            $(this).closest('table').find('input[type=checkbox]')
                .not(this).prop('checked', $(this).prop('checked'));
        });
    }(jQuery);

    /* ========================================================================
     * Animate Progress Bars
     * ========================================================================
     */
    !function($){

        $.fn.animateProgressBar = function () {
            return this.each(function () {
                var $bar = $(this);
                $bar.css('width', $bar.data('width'));
            })
        };

        $('.js-progress-animate').animateProgressBar();
    }(jQuery);
}

/**
 * Demo-only functions. Does not affect the core Sing functionality.
 * Should be removed when used in real app.
 */
function initDemoFunctions(){
    !function($){
        $('.theme-helper-toggler').click(() => {
            $('.theme-helper').toggleClass('theme-helper-opened');
        });

        // Theme Switcher

        const sidebar = $(".sidebar");
        const chat = $("#chat");
        const navbar = $(".navbar");
        const sup = $("sup");
        const circle = $(".circle");
        const styles = ["navbar-first ", "second ", "third ", "fourth ", "fifth ", "sixth ", "seventh ", "eighth ", "ninth "];

        $("[name=navbar-type]").change(function() {
            if (this.value === 'floating') {
                navbar.addClass('navbar-floating-type');
            } else {
                navbar.removeClass('navbar-floating-type');
            }
        });

        $("[name=sidebar-type]").change( function() {
            if (this.value === "transparent") { (sidebar).addClass('sidebar-transparent') }
            else {(sidebar).removeClass('sidebar-transparent')}
        });


        $('.colors-list .color-box-nav-bar').click(function(e) {
            const target = $(e.target);
            const darkBG = ["first", "third", "eighth"];

            $('.color-box-nav-bar').removeClass('active');
            target.addClass('active');
            navbar.removeClass(styles.join("navbar-")).addClass(`navbar-${target.data('style')}`);
            circle.removeClass().addClass(`circle bg-${ darkBG.indexOf(target.data('style')) >= 0 ? "success" : "primary" } fw-bold text-white`);
        });

        $('.colors-list .color-box-side-bar').click(function(e) {
            const target = $(e.target);
            $('.color-box-side-bar').removeClass('active');
            sidebar.removeClass("sidebar-first");
            sidebar.removeClass(styles.join("sidebar-")).addClass(`sidebar sidebar-${target.data('style')}`);
            chat.removeClass().addClass(`chat-sidebar chat-sidebar-${target.data('style')}`);

            switch(target.data('style')) {
                case "first":
                case "second":
                case "fourth":
                case "eighth":
                    sup.removeClass().addClass("text-success fw-semi-bold");
                    break;
                case "third":
                case "fifth":
                case "sixth":
                case "seventh":
                    sup.removeClass().addClass("text-info fw-semi-bold");
                    break;
                case "ninth":
                    sup.removeClass().addClass("text-primary fw-semi-bold");
                    break;
            }
            target.addClass('active');
        });

    }(jQuery);
}
