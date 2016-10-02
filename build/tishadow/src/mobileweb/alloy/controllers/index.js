function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    __p.require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __alloyId0 = [];
    $.__views.fgWin = __ui.createWindow({
        backgroundColor: "#14141f",
        id: "fgWin"
    });
    $.__views.fg = Alloy.createWidget("com.prodz.tiflexigrid", "widget", {
        id: "fg",
        __parentSymbol: $.__views.fgWin
    });
    $.__views.fg.setParent($.__views.fgWin);
    $.__views.downloadView = Ti.UI.createView({
        backgroundColor: "#14141f",
        id: "downloadView"
    });
    $.__views.fgWin.add($.__views.downloadView);
    $.__views.download = Ti.UI.createProgressBar({
        message: "Loading data...",
        width: "50%",
        height: 25,
        left: "25%",
        right: "25%",
        top: "45%",
        id: "download"
    });
    $.__views.downloadView.add($.__views.download);
    $.__views.main = Ti.UI.createTab({
        window: $.__views.fgWin,
        id: "main",
        title: "Last Subs"
    });
    __alloyId0.push($.__views.main);
    $.__views.favouriteWin = __ui.createWindow({
        backgroundColor: "#14141f",
        id: "favouriteWin"
    });
    $.__views.favouriteList = Alloy.createWidget("favourite.info", "widget", {
        id: "favouriteList",
        __parentSymbol: $.__views.favouriteWin
    });
    $.__views.favouriteList.setParent($.__views.favouriteWin);
    $.__views.favourite = Ti.UI.createTab({
        window: $.__views.favouriteWin,
        id: "favourite",
        title: "Favourite"
    });
    __alloyId0.push($.__views.favourite);
    $.__views.mainTab = __ui.createTabGroup({
        tabs: __alloyId0,
        id: "mainTab"
    });
    $.__views.mainTab && $.addTopLevelView($.__views.mainTab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var gridItems = [];
    var url = "http://subfactorysapi.azurewebsites.net/api/subs";
    var json;
    var allGridElementsColor = "#14141f";
    $.mainTab.open();
    var downloadJSON = Ti.Network.createHTTPClient({
        onload: function() {
            initGrid(this.responseText);
            $.favouriteList.initFavourite();
            $.downloadView.setVisible(false);
            $.mainTab.setSwipeable(true);
        },
        onerror: function() {
            alert("Error with episode list download");
        },
        ondatastream: function(e) {
            $.download.value = e.progress;
        }
    });
    $.mainTab.addEventListener("open", function() {
        $.mainTab.setActiveTab(0);
        $.mainTab.setSwipeable(false);
        setMenu();
        downloadJSON.open("GET", url);
        downloadJSON.send();
    });
    $.favourite.addEventListener("selected", function() {
        $.favouriteList.checkNewElement();
    });
    var setMenu = function() {
        var activity = $.mainTab.getActivity();
        activity.actionBar;
        activity.onCreateOptionsMenu = function(e) {
            var menuItem = e.menu.add({
                icon: __p.file(Ti.Android.R.drawable.ic_menu_search),
                showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
            });
            menuItem.addEventListener("click", function() {
                var searchCtrl = Alloy.createController("search");
                var searchCtrlView = searchCtrl.getView();
                searchCtrlView.open();
            });
        };
        activity.invalidateOptionsMenu();
    };
    var isEmpty = function(array) {
        return 0 == array.length;
    };
    var createGrid = function() {
        $.fg.init({
            columns: 2,
            space: 5,
            gridBackgroundColor: allGridElementsColor,
            itemHeightDelta: 0,
            itemBackgroundColor: allGridElementsColor,
            itemBorderColor: allGridElementsColor,
            itemBorderWidth: 0,
            itemBorderRadius: 0
        });
    };
    var openEpisodeInfo = function(e) {
        var episodeInfoCtrl = Alloy.createController("episodeInfo", {
            title: e.source.data.title,
            image: __p.file(e.source.data.image),
            url: __p.file(e.source.data.url),
            date: e.source.data.date
        });
        var episodeInfoView = episodeInfoCtrl.getView();
        episodeInfoView.open();
    };
    var initGrid = function(response) {
        if (isEmpty(gridItems)) {
            createGrid();
            json = JSON.parse(response);
            for (var i = 0, len = json.length; len > i; i++) {
                var gridItem = {
                    title: json[i].Title,
                    image: __p.file(json[i].Image),
                    url: __p.file(json[i].Link),
                    date: json[i].Date
                };
                gridItems.push({
                    view: null,
                    data: gridItem
                });
            }
        }
        $.fg.addGridItems(gridItems);
        $.fg.setOnItemClick(function(e) {
            openEpisodeInfo(e);
        });
    };
    $.mainTab.addEventListener("androidback", function() {
        var activity = Titanium.Android.currentActivity;
        activity.finish();
    });
    _.extend($, exports);
}

var Alloy = __p.require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;