function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "it.dmi.unict/" + s : s.substring(0, index) + "/it.dmi.unict/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isApi: true,
    priority: 1000.0004,
    key: "Label",
    style: {
        color: "#000",
        font: {
            fontSize: 18,
            fontWeight: "bold"
        },
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    }
} ];