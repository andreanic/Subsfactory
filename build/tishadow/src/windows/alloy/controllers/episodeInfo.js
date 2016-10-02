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
    this.__controllerPath = "episodeInfo";
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
    $.__views.infoWin = __ui.createWindow({
        id: "infoWin"
    });
    $.__views.infoWin && $.addTopLevelView($.__views.infoWin);
    $.__views.menu = Alloy.createWidget("it.dmi.unict", "widget", {
        id: "menu",
        __parentSymbol: $.__views.infoWin
    });
    $.__views.menu.setParent($.__views.infoWin);
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#14141f",
        layout: "vertical",
        visible: false,
        id: "container"
    });
    $.__views.infoWin.add($.__views.container);
    $.__views.imageContainer = Ti.UI.createView({
        top: 25,
        height: "30%",
        layout: "vertical",
        id: "imageContainer"
    });
    $.__views.container.add($.__views.imageContainer);
    $.__views.image = __p.file(Ti.UI.createImageView({
        width: "40%",
        id: "image"
    }));
    $.__views.imageContainer.add($.__views.image);
    $.__views.title = Ti.UI.createLabel({
        color: "white",
        backgroundColor: "#14141f",
        font: {
            fontSize: 20
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        id: "title"
    });
    $.__views.imageContainer.add($.__views.title);
    $.__views.someInfo = Ti.UI.createView({
        height: 60,
        layout: "vertical",
        id: "someInfo"
    });
    $.__views.container.add($.__views.someInfo);
    $.__views.episodeTitle = Ti.UI.createLabel({
        color: "white",
        backgroundColor: "#14141f",
        font: {
            fontSize: 15
        },
        id: "episodeTitle"
    });
    $.__views.someInfo.add($.__views.episodeTitle);
    $.__views.author = Ti.UI.createLabel({
        color: "white",
        backgroundColor: "#14141f",
        font: {
            fontSize: 15
        },
        id: "author"
    });
    $.__views.someInfo.add($.__views.author);
    $.__views.date = Ti.UI.createLabel({
        color: "white",
        backgroundColor: "#14141f",
        font: {
            fontSize: 15
        },
        id: "date"
    });
    $.__views.someInfo.add($.__views.date);
    $.__views.btnContainer = Ti.UI.createView({
        height: "20%",
        top: "35%",
        bottom: 10,
        layout: "horizontal",
        id: "btnContainer"
    });
    $.__views.container.add($.__views.btnContainer);
    $.__views.infoBtnContainer = Ti.UI.createView({
        width: "50%",
        backgroundColor: "#14141f",
        id: "infoBtnContainer"
    });
    $.__views.btnContainer.add($.__views.infoBtnContainer);
    $.__views.infoBtn = Ti.UI.createButton({
        width: 100,
        height: 50,
        color: "#0099ff",
        borderColor: "#f9f9f9",
        borderRadius: 15,
        backgroundColor: "white",
        title: "Info",
        id: "infoBtn"
    });
    $.__views.infoBtnContainer.add($.__views.infoBtn);
    $.__views.downloadBtnContainer = Ti.UI.createView({
        width: "50%",
        backgroundColor: "#14141f",
        id: "downloadBtnContainer"
    });
    $.__views.btnContainer.add($.__views.downloadBtnContainer);
    $.__views.downloadBtn = Ti.UI.createButton({
        width: 100,
        height: 50,
        color: "#0099ff",
        borderColor: "#f9f9f9",
        borderRadius: 15,
        backgroundColor: "white",
        title: "Download",
        id: "downloadBtn"
    });
    $.__views.downloadBtnContainer.add($.__views.downloadBtn);
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = $.args;
    var title = args.title;
    var image = args.image;
    var date = args.date;
    var url = "http://subfactorysapi.azurewebsites.net/api/subs?url=" + args.url;
    var infoLink, downloadLink;
    var epTitle, author;
    var downloadJSON = Ti.Network.createHTTPClient({
        onload: function() {
            json = JSON.parse(this.responseText);
            setTimeout(function() {
                setSomeInfo(json);
                $.down.setVisible(false);
                $.container.setVisible(true);
            }, 500);
        },
        onerror: function() {
            alert("Error with subtitle download");
            alert("Download failed");
        },
        ondatastream: function(e) {
            $.download.value = e.progress;
        }
    });
    var downloadSubs = Ti.Network.createHTTPClient({
        onload: function() {
            var subs = Ti.Filesystem.getFile(__p.getFile("file:///mnt/sdcard/Download/", title + ".zip"));
            subs.write(this.responseData);
            alert("Download finished, you can find it into Download folder");
        },
        onerror: function() {
            alert("Download failed");
        }
    });
    $.infoWin.addEventListener("open", function() {
        $.menu.initMyMenu($.infoWin);
        setMenu();
        downloadJSON.open("GET", url);
        downloadJSON.send();
    });
    $.downloadBtn.addEventListener("click", function() {
        downloadSubs.open("GET", downloadLink);
        downloadSubs.send();
        alert("Download started");
    });
    $.infoBtn.addEventListener("click", function() {
        var infoBoxCtrl = Alloy.createController("info", {
            url: __p.file(infoLink),
            favourite: false
        });
        var infoBoxView = infoBoxCtrl.getView();
        infoBoxView.open();
    });
    var setMenu = function() {
        var activity = $.infoWin.getActivity();
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
    var setSomeInfo = function(json) {
        author = json.AuthorName;
        epTitle = json.EpisodeTitle;
        downloadLink = json.DownloadLink;
        infoLink = json.ShowInfoLink;
        $.image.setImage(__p.file(image));
        $.title.setText(title);
        $.episodeTitle.text = "Episode Title: " + epTitle;
        $.author.text = "Author Name: " + author;
        $.date.text = "Date: " + date;
    };
    _.extend($, exports);
}

var Alloy = __p.require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;