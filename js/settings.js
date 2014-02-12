$(function(){
    var NextOne = function(){
        var defaultSettings =  {
            sidebarState: 'auto'
        };
        this.settingName = 'next-one-settings';
        this.settings = JSON.parse(localStorage.getItem(this.settingName)) || defaultSettings;
    };

    NextOne.prototype.save = function(){
        localStorage.setItem(this.settingName, JSON.stringify(this.settings));
    };

    NextOne.prototype.toggleSidebarState = function(callback){
        this.settings.sidebarState = this.settings.sidebarState == 'icons' ? 'auto' : 'icons'; //new state
        this.save();
        if (callback){
            callback(this.isSidebarIconsState());
        }
    };

    NextOne.prototype.isSidebarIconsState = function(){
        return this.settings.sidebarState == 'icons'
    };

    window.NextOneApp = new NextOne();
});