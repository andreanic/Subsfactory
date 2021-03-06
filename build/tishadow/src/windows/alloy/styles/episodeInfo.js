module.exports = [ {
    isApi: true,
    priority: 1000.0015,
    key: "Label",
    style: {
        color: "white",
        backgroundColor: "#14141f",
        font: {
            fontSize: 15
        }
    }
}, {
    isApi: true,
    priority: 1000.0016,
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
    priority: 10000.002,
    key: "container",
    style: {
        width: "50%",
        backgroundColor: "#14141f"
    }
}, {
    isId: true,
    priority: 100000.001,
    key: "container",
    style: {
        backgroundColor: "#14141f",
        layout: "vertical",
        visible: false
    }
}, {
    isId: true,
    priority: 100000.0011,
    key: "imageContainer",
    style: {
        top: 25,
        height: "30%",
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.0012,
    key: "image",
    style: {
        width: "40%"
    }
}, {
    isId: true,
    priority: 100000.0013,
    key: "title",
    style: {
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        font: {
            fontSize: 20
        }
    }
}, {
    isId: true,
    priority: 100000.0014,
    key: "someInfo",
    style: {
        height: 60,
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.0017,
    key: "btnContainer",
    style: {
        height: "20%",
        top: "35%",
        bottom: 10,
        layout: "horizontal"
    }
}, {
    isId: true,
    priority: 100000.0018,
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
    priority: 100000.0019,
    key: "down",
    style: {
        backgroundColor: "#14141f"
    }
} ];