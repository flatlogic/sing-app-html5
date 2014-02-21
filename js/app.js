$(function(){
    var SingAppView = function(){
        this.navCollapseTimeout = 1000;
        this.$sidebar = $('#sidebar');
        this.$content = $('#content');
        this.loaderTemplate = _.template($('#loader-template').html());
        this.settings = window.SingSettings;

        this.$sidebar.on('mouseover', $.proxy(this.expandNavigation, this));
        this.$sidebar.on('mouseout', $.proxy(this.collapseNavigation, this));

        this.checkNavigationState();

        $(document).pjax('#sidebar a', '.content', {fragment: '.content'});
        $(document).on('pjax:end', $.proxy(this.changeActiveNavigationItem, this));
        $(document).on('pjax:start', $.proxy(this.showLoader, this));
        $(document).on('pjax:end', $.proxy(this.hideLoader, this));
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

    SingAppView.prototype.changeActiveNavigationItem = function(){
        this.$sidebar.find('li.active').removeClass('active');

        //credit: http://stackoverflow.com/a/8497143/1298418
        var pageName = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
        this.$sidebar.find('a[href*="' + pageName + '"]').closest('li').addClass('active');
    };

    SingAppView.prototype.showLoader = function(){
        var view = this;
        this.showLoaderTimeout = setTimeout(function(){
            view.$content.html(this.loaderTemplate());
        }, 200);
    };

    SingAppView.prototype.hideLoader = function(){
        clearTimeout(this.showLoaderTimeout);
        this.$content.html('');
    };

    window.SingApp = new SingAppView();
});