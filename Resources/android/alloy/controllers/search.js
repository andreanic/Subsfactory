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
    this.__controllerPath = "search";
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
    $.__views.searchWin = Ti.UI.createWindow({
        backgroundColor: "#14141f",
        id: "searchWin"
    });
    $.__views.searchWin && $.addTopLevelView($.__views.searchWin);
    $.__views.mainContainer = Ti.UI.createView({
        layout: "vertical",
        id: "mainContainer"
    });
    $.__views.searchWin.add($.__views.mainContainer);
    $.__views.__alloyId3 = Ti.UI.createView({
        top: 5,
        layout: "horizontal",
        height: 40,
        id: "__alloyId3"
    });
    $.__views.mainContainer.add($.__views.__alloyId3);
    $.__views.lbl = Ti.UI.createLabel({
        top: 0,
        height: 40,
        color: "white",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 18
        },
        text: "What Are You Looking For?",
        id: "lbl"
    });
    $.__views.__alloyId3.add($.__views.lbl);
    $.__views.__alloyId4 = Ti.UI.createView({
        top: 5,
        layout: "horizontal",
        height: 40,
        id: "__alloyId4"
    });
    $.__views.mainContainer.add($.__views.__alloyId4);
    $.__views.searchBar = Ti.UI.createSearchBar({
        top: 5,
        height: 40,
        width: "80%",
        hintText: "Put your text here...",
        id: "searchBar",
        showCancel: false
    });
    $.__views.__alloyId4.add($.__views.searchBar);
    $.__views.searchButton = Ti.UI.createImageView({
        width: 35,
        height: 35,
        left: 10,
        image: "/images/searchXXL.png",
        color: "#0099ff",
        borderColor: "#f9f9f9",
        borderRadius: 15,
        backgroundColor: "white",
        id: "searchButton"
    });
    $.__views.__alloyId4.add($.__views.searchButton);
    $.__views.resultContainer = Ti.UI.createView({
        top: 15,
        height: Ti.UI.FILL,
        id: "resultContainer"
    });
    $.__views.mainContainer.add($.__views.resultContainer);
    $.__views.result = Ti.UI.createScrollView({
        layout: "vertical",
        id: "result"
    });
    $.__views.resultContainer.add($.__views.result);
    $.__views.download = Ti.UI.createView({
        visible: false,
        backgroundColor: "#14141f",
        id: "download"
    });
    $.__views.resultContainer.add($.__views.download);
    $.__views.progress = Ti.UI.createProgressBar({
        message: "Loading data...",
        width: "50%",
        height: 25,
        left: "25%",
        right: "25%",
        top: "45%",
        id: "progress"
    });
    $.__views.download.add($.__views.progress);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.args;
    var url = "http://subfactorysapi.azurewebsites.net/api/show?value=";
    var title, infoLink;
    var downloadJSON = Ti.Network.createHTTPClient({
        onload: function() {
            var json = JSON.parse(this.responseText);
            setResult(json);
            setTimeout(function() {
                $.download.setVisible(false);
            }, 500);
        },
        onerror: function() {
            alert("Error with search");
        },
        ondatastream: function(e) {
            $.progress.value = e.progress;
        }
    });
    $.searchButton.addEventListener("click", function() {
        Ti.UI.Android.hideSoftKeyboard();
        $.download.setVisible(true);
        if (0 == $.searchBar.value.length) {
            alert("No value for search");
            return;
        }
        title = $.searchBar.value.toLowerCase();
        title = title.replace(" ", "+");
        downloadJSON.open("GET", url + title);
        downloadJSON.send();
    });
    var setResult = function(json) {
        $.result.removeAllChildren();
        if (null == json || void 0 == json) {
            alert("No result find");
            return;
        }
        var view = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: 150,
            layout: "horizontal"
        });
        var image = Ti.UI.createImageView({
            image: json.Poster
        });
        var textView = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            layout: "vertical"
        });
        var title = Ti.UI.createLabel({
            left: 5,
            top: 5,
            height: 30,
            width: Ti.UI.FILL,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            text: json.Title,
            color: "white",
            font: {
                fontSize: 20
            }
        });
        var plotTxt = json.ShowSummary.substr(0, 100);
        plotTxt += "[..]";
        var plot = Ti.UI.createLabel({
            left: 5,
            top: 5,
            height: 55,
            width: Ti.UI.FILL,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            text: plotTxt,
            color: "white",
            font: {
                fontSize: 15
            }
        });
        textView.add(title);
        textView.add(plot);
        view.add(image);
        view.add(textView);
        infoLink = json.Link;
        Ti.API.info("infoLink = " + infoLink);
        view.addEventListener("click", function() {
            var infoBoxCtrl = Alloy.createController("info", {
                url: infoLink,
                favourite: false
            });
            var infoBoxView = infoBoxCtrl.getView();
            infoBoxView.open();
        });
        $.result.add(view);
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;