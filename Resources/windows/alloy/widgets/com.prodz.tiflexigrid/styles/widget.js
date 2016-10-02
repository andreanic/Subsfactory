function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.prodz.tiflexigrid/" + s : s.substring(0, index) + "/com.prodz.tiflexigrid/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0001,
    key: "fgMain",
    style: {
        backgroundColor: "#fff"
    }
}, {
    isId: true,
    priority: 100000.0002,
    key: "fgWrapper",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor: "transparent"
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "fgScrollView",
    style: {
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        contentHeight: Ti.UI.SIZE,
        contentWidth: Ti.UI.FILL,
        layout: "horizontal",
        backgroundColor: "transparent",
        scrollType: "vertical"
    }
} ];