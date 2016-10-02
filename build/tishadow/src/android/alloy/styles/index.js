module.exports = [ {
    isApi: true,
    priority: 1000.0022,
    key: "Window",
    style: {
        backgroundColor: "#14141f"
    }
}, {
    isApi: true,
    priority: 1000.0023,
    key: "Label",
    style: {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000"
    }
}, {
    isApi: true,
    priority: 1000.0027,
    key: "Button",
    style: {
        width: 100,
        height: 50,
        color: "#0099ff",
        borderColor: "#f9f9f9",
        borderRadius: 15,
        backgroundColor: "white"
    }
}, {
    isClass: true,
    priority: 10000.0021,
    key: "container",
    style: {
        backgroundColor: "#14141f"
    }
}, {
    isId: true,
    priority: 100000.0024,
    key: "download",
    style: {
        message: "Loading data...",
        width: "50%",
        height: 25,
        left: "25%",
        right: "25%",
        top: "45%"
    }
}, {
    isId: true,
    priority: 100000.0025,
    key: "downloadView",
    style: {
        backgroundColor: "#14141f"
    }
}, {
    isId: true,
    priority: 100000.0026,
    key: "searchButton",
    style: {
        showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
    }
}, {
    isId: true,
    priority: 100000.0028,
    key: "subscribeBtn",
    style: {
        top: "20%"
    }
}, {
    isId: true,
    priority: 100000.0029,
    key: "sendPushBtn",
    style: {
        top: "50%"
    }
} ];