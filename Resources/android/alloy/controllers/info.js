function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "info";
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
    var __alloyId2 = [];
    $.__views.infoWin = Ti.UI.createWindow({
        id: "infoWin",
        title: "Plot"
    });
    $.__views.down = Ti.UI.createView({
        backgroundColor: "#14141f",
        id: "down"
    });
    $.__views.infoWin.add($.__views.down);
    $.__views.download = Ti.UI.createProgressBar({
        message: "Loading data...",
        width: "50%",
        height: 25,
        left: "25%",
        right: "25%",
        top: "45%",
        id: "download"
    });
    $.__views.down.add($.__views.download);
    $.__views.container = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#14141f",
        visible: false,
        id: "container"
    });
    $.__views.infoWin.add($.__views.container);
    $.__views.imageContainer = Ti.UI.createView({
        top: 25,
        height: "35%",
        layout: "vertical",
        backgroundColor: "#14141f",
        id: "imageContainer"
    });
    $.__views.container.add($.__views.imageContainer);
    $.__views.image = Ti.UI.createImageView({
        width: "30%",
        height: "80%",
        id: "image"
    });
    $.__views.imageContainer.add($.__views.image);
    $.__views.title = Ti.UI.createLabel({
        height: 30,
        font: {
            fontSize: 20
        },
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        id: "title"
    });
    $.__views.imageContainer.add($.__views.title);
    $.__views.plotTitle = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: 15
        },
        backgroundColor: "#14141f",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: 10,
        width: Ti.UI.FILL,
        text: "Plot",
        id: "plotTitle"
    });
    $.__views.container.add($.__views.plotTitle);
    $.__views.plot = Ti.UI.createScrollView({
        top: 10,
        height: "30%",
        id: "plot"
    });
    $.__views.container.add($.__views.plot);
    $.__views.plotTxt = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: 15
        },
        backgroundColor: "#14141f",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        top: 0,
        id: "plotTxt"
    });
    $.__views.plot.add($.__views.plotTxt);
    $.__views.btnContainer = Ti.UI.createView({
        height: "20%",
        top: "5%",
        bottom: 10,
        layout: "horizontal",
        id: "btnContainer"
    });
    $.__views.container.add($.__views.btnContainer);
    $.__views.favourite = Ti.UI.createButton({
        width: 100,
        height: 50,
        color: "#0099ff",
        borderColor: "#f9f9f9",
        borderRadius: 15,
        backgroundColor: "white",
        top: "10%",
        left: "35%",
        title: "Add Favourite",
        id: "favourite"
    });
    $.__views.btnContainer.add($.__views.favourite);
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.infoWin,
        id: "tab1",
        title: "Plot"
    });
    __alloyId2.push($.__views.tab1);
    $.__views.seasonWin = Ti.UI.createWindow({
        id: "seasonWin",
        title: "Seasons' List"
    });
    $.__views.container2 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#14141f",
        visible: false,
        id: "container2"
    });
    $.__views.seasonWin.add($.__views.container2);
    $.__views.season = Alloy.createWidget("season.info", "widget", {
        id: "season",
        __parentSymbol: $.__views.container2
    });
    $.__views.season.setParent($.__views.container2);
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.seasonWin,
        id: "tab2",
        title: "Seasons' List"
    });
    __alloyId2.push($.__views.tab2);
    $.__views.castWin = Ti.UI.createWindow({
        id: "castWin",
        title: "Cast"
    });
    $.__views.container3 = Ti.UI.createView({
        layout: "vertical",
        backgroundColor: "#14141f",
        visible: false,
        id: "container3"
    });
    $.__views.castWin.add($.__views.container3);
    $.__views.cast = Alloy.createWidget("cast.info", "widget", {
        id: "cast",
        __parentSymbol: $.__views.container3
    });
    $.__views.cast.setParent($.__views.container3);
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.castWin,
        id: "tab2",
        title: "Cast"
    });
    __alloyId2.push($.__views.tab2);
    $.__views.tab = Ti.UI.createTabGroup({
        tabs: __alloyId2,
        id: "tab"
    });
    $.__views.tab && $.addTopLevelView($.__views.tab);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var url = "http://subfactorysapi.azurewebsites.net/api/show?value=" + args.url;
    var image, title, miniUrl = args.url;
    var json;
    var favourite = false;
    var downloadJSON = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.info("Download complete");
            json = JSON.parse(this.responseText);
            setTimeout(function() {
                setInfo(json);
                isFavourite(title);
                setViewVisibility();
            }, 500);
        },
        onerror: function() {
            alert("Error with subtitle download");
            setTimeout(function() {
                $.tab.close();
            }, 1e3);
        },
        ondatastream: function(e) {
            $.download.value = e.progress;
        }
    });
    $.tab.addEventListener("open", function() {
        setMenu();
        $.tab.setActiveTab(0);
        $.tab.setSwipeable(false);
        downloadJSON.open("GET", url);
        downloadJSON.send();
    });
    $.tab.addEventListener("androidback", function() {
        if (true == args.favourite) {
            var mainBoxCtrl = Alloy.createController("index");
            var mainBoxCtrl = mainBoxCtrl.getView();
            mainBoxCtrl.open();
        } else $.tab.close();
    });
    $.favourite.addEventListener("click", function() {
        if (favourite) {
            var db = Ti.Database.open("Favourite");
            db.execute("DELETE FROM favourite WHERE title = ?", title);
            db.close();
            favourite = false;
            $.favourite.setTitle("Add Favourite");
            alert("Removed from Favourite");
        } else {
            var db = Ti.Database.open("Favourite");
            db.execute("INSERT INTO favourite (title,url,image) VALUES (?,?,?)", title, miniUrl, image);
            db.close();
            favourite = true;
            $.favourite.setTitle("Remove Favourite");
            alert("Added to Favourite");
        }
    });
    var setMenu = function() {
        var activity = $.tab.getActivity();
        activity.actionBar;
        activity.onCreateOptionsMenu = function(e) {
            var menuItem = e.menu.add({
                icon: Ti.Android.R.drawable.ic_menu_search,
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
    var setInfo = function(json) {
        image = json.Poster;
        title = json.Title;
        $.image.setImage(image);
        $.title.setText(title);
        $.plotTxt.setText(json.ShowSummary);
        $.season.initSeason(json.SeasonList);
        $.cast.initCast(json.ListOfActors);
    };
    var isFavourite = function(title) {
        var db = Ti.Database.open("Favourite");
        var result = db.execute("SELECT * FROM favourite WHERE title = ?", title);
        if (result.isValidRow()) {
            favourite = true;
            $.favourite.setTitle("Remove Favourite");
        }
    };
    var setViewVisibility = function() {
        $.down.setVisible(false);
        $.container.setVisible(true);
        $.container2.setVisible(true);
        $.container3.setVisible(true);
        $.tab.setSwipeable(true);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;