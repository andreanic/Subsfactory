function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "cast.info/" + s : s.substring(0, index) + "/cast.info/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0005,
    key: "list",
    style: {
        backgroundColor: "#14141f",
        layout: "vertical"
    }
} ];