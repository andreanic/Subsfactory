function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "favourite.info/" + s : s.substring(0, index) + "/favourite.info/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
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
    new (require("alloy/widget"))("favourite.info");
    this.__widgetId = "favourite.info";
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
    $.__views.favourite = Ti.UI.createScrollView({
        backgroundColor: "#14141f",
        layout: "vertical",
        id: "favourite"
    });
    $.__views.favourite && $.addTopLevelView($.__views.favourite);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var urlList = {};
    var numberOfChilder = 0;
    var createRow = function(title, image) {
        var row = Ti.UI.createView({
            height: 150,
            width: Ti.UI.FILL,
            layout: "horizontal"
        });
        var image = Ti.UI.createImageView({
            image: image
        });
        var lbl = Ti.UI.createLabel({
            left: 5,
            top: 50,
            height: 30,
            width: Ti.UI.FILL,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            text: title,
            color: "white",
            font: {
                fontSize: 20
            }
        });
        lbl.addEventListener("click", function() {
            openShow(this.text);
        });
        row.add(image);
        row.add(lbl);
        return row;
    };
    var openShow = function(title) {
        data = urlList[title];
        var infoBoxCtrl = Alloy.createController("info", {
            url: data,
            favourite: true
        });
        var infoBoxView = infoBoxCtrl.getView();
        infoBoxView.open();
    };
    var setFavouriteInfo = function(title, url, image) {
        var row = createRow(title, image);
        urlList[title] = url;
        $.favourite.add(row);
    };
    var setNoFavourite = function() {
        var lbl = Ti.UI.createLabel({
            top: "45%",
            height: "10%",
            width: Ti.UI.FILL,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            text: "You haven't Favourite in your list",
            color: "white",
            font: {
                fontSize: 20
            }
        });
        $.favourite.add(lbl);
    };
    var databaseSearch = function() {
        var db = Ti.Database.open("Favourite");
        db.execute("CREATE TABLE IF NOT EXISTS favourite(title TEXT PRIMARY KEY, url TEXT, image TEXT);");
        var result = db.execute("SELECT * FROM favourite");
        return result;
    };
    var initFavourite = function(res) {
        var result;
        result = void 0 == res ? databaseSearch() : res;
        if (result.getRowCount() > 0) while (result.isValidRow()) {
            setFavouriteInfo(result.fieldByName("title"), result.fieldByName("url"), result.fieldByName("image"));
            result.next();
            numberOfChilder++;
        } else setNoFavourite();
    };
    var clearList = function() {
        $.favourite.removeAllChildren();
    };
    var checkNewElement = function() {
        var db = Ti.Database.open("Favourite");
        var result = db.execute("SELECT * FROM favourite");
        if (result.getRowCount() != numberOfChilder) {
            numberOfChilder = 0;
            clearList();
            initFavourite(result);
            return;
        }
        return;
    };
    exports.initFavourite = initFavourite;
    exports.clearList = clearList;
    exports.checkNewElement = checkNewElement;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;