module.exports = [ {
    isApi: true,
    priority: 1000.004,
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
    priority: 10000.003,
    key: "container",
    style: {
        layout: "vertical",
        backgroundColor: "#14141f",
        visible: false
    }
}, {
    isClass: true,
    priority: 10000.0031,
    key: "txt",
    style: {
        color: "white",
        font: {
            fontSize: 15
        },
        backgroundColor: "#14141f",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
    }
}, {
    isClass: true,
    priority: 10000.0033,
    key: "title",
    style: {
        height: 30,
        font: {
            fontSize: 20
        },
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "white"
    }
}, {
    isId: true,
    priority: 100000.0032,
    key: "imageContainer",
    style: {
        top: 25,
        height: "35%",
        layout: "vertical",
        backgroundColor: "#14141f"
    }
}, {
    isId: true,
    priority: 100000.0034,
    key: "plot",
    style: {
        top: 10,
        height: "30%"
    }
}, {
    isId: true,
    priority: 100000.0035,
    key: "image",
    style: {
        width: "30%",
        height: "80%"
    }
}, {
    isId: true,
    priority: 100000.0036,
    key: "plotTitle",
    style: {
        top: 10,
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
    }
}, {
    isId: true,
    priority: 100000.0037,
    key: "plotTxt",
    style: {
        top: 0
    }
}, {
    isId: true,
    priority: 100000.0038,
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
    priority: 100000.0039,
    key: "down",
    style: {
        backgroundColor: "#14141f"
    }
}, {
    isId: true,
    priority: 100000.0041,
    key: "btnContainer",
    style: {
        height: "20%",
        top: "5%",
        bottom: 10,
        layout: "horizontal"
    }
}, {
    isId: true,
    priority: 100000.0042,
    key: "favourite",
    style: {
        top: "10%",
        left: "35%"
    }
} ];