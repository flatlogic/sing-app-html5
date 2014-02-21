$(function(){
    var SingSettingsBundle = function(){
        var defaultSettings =  {
            'nav-collapsed': true
        };
        this.settingName = 'sing-app-settings';
        this._settings = JSON.parse(localStorage.getItem(this.settingName)) || defaultSettings;
    };

    SingSettingsBundle.prototype.save = function(){
        localStorage.setItem(this.settingName, JSON.stringify(this._settings));
    };

    SingSettingsBundle.prototype.get = function(key){
        return this._settings[key];
    };

    SingSettingsBundle.prototype.set = function(key, value){
        this._settings[key] = value;
    };

    window.SingSettings = new SingSettingsBundle();
});