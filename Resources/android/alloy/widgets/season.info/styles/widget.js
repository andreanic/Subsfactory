function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "season.info/" + s : s.substring(0, index) + "/season.info/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0006,
    key: "list",
    style: {
        backgroundColor: "#14141f",
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "season",
    style: {
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "seasonListLbl",
    style: {
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        height: 40,
        font: {
            fontSize: 30
        }
    }
} ];