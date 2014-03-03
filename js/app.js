$(function(){
    var SingAppView = function(){
        this.navCollapseTimeout = 1000;
        this.$sidebar = $('#sidebar');
        this.$contentWrap = $('.content-wrap');
        this.loaderTemplate = _.template($('#loader-template').html());
        this.settings = window.SingSettings;

        this.$sidebar.on('mouseover', $.proxy(this.expandNavigation, this));
        this.$sidebar.on('mouseout', $.proxy(this.collapseNavigation, this));

        this.checkNavigationState();

        $(document).pjax('#sidebar a', '#content', {
            fragment: '#content',
            replace: true,
            type: 'POST' //prevents caching
        });
        $(document).on('pjax:start', $.proxy(this.changeActiveNavigationItem, this));
        $(document).on('pjax:send', $.proxy(this.showLoader, this));
        $(document).on('pjax:complete', $.proxy(this.hideLoader, this));
    };

    SingAppView.prototype.checkNavigationState = function(){
        if (this.settings.get('nav-collapsed') === true){
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

    SingAppView.prototype.changeActiveNavigationItem = function(event, xhr, options){
        this.$sidebar.find('li.active').removeClass('active');

        //credit: http://stackoverflow.com/a/8497143/1298418
        var pageName = options.url.substring(options.url.lastIndexOf("/") + 1);
        this.$sidebar.find('a[href*="' + pageName + '"]').closest('li').addClass('active');
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

    window.SingApp = new SingAppView();
});