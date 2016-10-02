function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "favourite.info/" + s : s.substring(0, index) + "/favourite.info/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0009,
    key: "list",
    style: {
        backgroundColor: "#14141f",
        layout: "vertical"
    }
} ];