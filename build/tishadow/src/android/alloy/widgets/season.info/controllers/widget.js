function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "season.info/" + s : s.substring(0, index) + "/season.info/" + s.substring(index + 1);
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
    new (__p.require("alloy/widget"))("season.info");
    this.__widgetId = "season.info";
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
    $.__views.seasonList = Ti.UI.createView({
        backgroundColor: "#14141f",
        layout: "vertical",
        id: "seasonList"
    });
    $.__views.seasonList && $.addTopLevelView($.__views.seasonList);
    $.__views.season = Ti.UI.createScrollView({
        layout: "vertical",
        id: "season"
    });
    $.__views.seasonList.add($.__views.season);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var setSeasonInfo = function(season) {
        var n = season.length;
        var lbl, k, epList;
        for (var i = 0; n > i; i++) {
            lbl = createLabel("season", season[i].SeasonTitle);
            $.season.add(lbl);
            epList = season[i].ListEpisodes;
            k = epList.length;
            for (var j = 0; k > j; j++) {
                lbl = createLabel("episode", epList[j].Title);
                $.season.add(lbl);
            }
        }
    };
    var createLabel = function(type, title) {
        var textSize;
        textSize = "season" == type ? 20 : 15;
        var lbl = Ti.UI.createLabel({
            height: textSize + 20,
            width: Ti.UI.FILL,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            text: title,
            color: "white",
            font: {
                fontSize: textSize
            }
        });
        return lbl;
    };
    var initSeason = function(json) {
        setSeasonInfo(json);
    };
    exports.initSeason = initSeason;
    _.extend($, exports);
}

var Alloy = __p.require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;