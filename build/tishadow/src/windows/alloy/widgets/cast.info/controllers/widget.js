function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "cast.info/" + s : s.substring(0, index) + "/cast.info/" + s.substring(index + 1);
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
    new (__p.require("alloy/widget"))("cast.info");
    this.__widgetId = "cast.info";
    __p.require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.cast = Ti.UI.createScrollView({
        backgroundColor: "#14141f",
        layout: "vertical",
        id: "cast"
    });
    $.__views.cast && $.addTopLevelView($.__views.cast);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var createRow = function(role, image) {
        __log.info("r: " + role);
        var row = Ti.UI.createView({
            height: 150,
            width: Ti.UI.FILL,
            layout: "horizontal",
            bottom: 5
        });
        var image = Ti.UI.createImageView({
            image: __p.file(image)
        });
        var lbl = Ti.UI.createLabel({
            left: 5,
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            text: role,
            color: "white",
            font: {
                fontSize: 15
            }
        });
        row.add(image);
        row.add(lbl);
        return row;
    };
    var setCastInfo = function(info) {
        var n = info.length;
        var row;
        __log.info("N = " + n);
        for (var i = 0; n > i; i++) {
            row = createRow(info[i].FullDescription, info[i].Photo);
            $.cast.add(row);
        }
    };
    var initCast = function(json) {
        setCastInfo(json);
    };
    exports.initCast = initCast;
    _.extend($, exports);
}

var Alloy = __p.require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;