function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "it.dmi.unict/" + s : s.substring(0, index) + "/it.dmi.unict/" + s.substring(index + 1);
    return path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    new (require("alloy/widget"))("it.dmi.unict");
    this.__widgetId = "it.dmi.unict";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.widget && $.addTopLevelView($.__views.widget);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var thisMenu;
    var itemMenu = [];
    var itemTitle = [ "Blog", "Login", "Search" ];
    var initMenu = function(menu) {
        thisMenu = menu;
        var n = itemTitle.length;
        for (i = 0; n > i; i++) {
            item = thisMenu.add({
                itemId: i,
                title: itemTitle[i]
            });
            item.addEventListener("click", function() {
                alert("Hai premuto " + this.title);
            });
            itemMenu[itemTitle[i]] = item;
        }
    };
    var setFunc = function(itemTitle, func) {
        itemMenu[itemTitle].addEventListener("click", function() {
            func();
        });
    };
    var setTitle = function(itemTitle, newItemTitle) {
        itemMenu[itemTitle].title = newItemTitle;
    };
    var setEnabled = function(enable) {
        for (var item in itemMenu) itemMenu[item].setEnabled(enable);
    };
    var initMyMenu = function(win) {
        var activity = win.activity;
        activity.onCreateOptionsMenu = function(e) {
            takeMenu = e.menu;
            initMenu(takeMenu);
        };
        activity.onPrepareOptionsMenu = function() {
            setEnabled(true);
        };
    };
    var openSelectedOption = function() {
        var ctrl = Alloy.createController(this.title.toLowerCase());
        var view = ctrl.getView();
        view.open();
    };
    exports.initMenu = initMenu;
    exports.setFunc = setFunc;
    exports.setTitle = setTitle;
    exports.setEnabled = setEnabled;
    exports.initMyMenu = initMyMenu;
    exports.openSelectedOption = openSelectedOption;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;