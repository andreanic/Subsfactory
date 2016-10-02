module.exports = [ {
    isClass: true,
    priority: 10000.0045,
    key: "container",
    style: {
        top: 5,
        layout: "horizontal",
        height: 40
    }
}, {
    isId: true,
    priority: 100000.0043,
    key: "searchWin",
    style: {
        backgroundColor: "#14141f"
    }
}, {
    isId: true,
    priority: 100000.0044,
    key: "mainContainer",
    style: {
        layout: "vertical"
    }
}, {
    isId: true,
    priority: 100000.0046,
    key: "lbl",
    style: {
        top: 0,
        height: 40,
        color: "white",
        width: Ti.UI.FILL,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 18
        }
    }
}, {
    isId: true,
    priority: 100000.0047,
    key: "searchBar",
    style: {
        top: 5,
        height: 40,
        width: "80%",
        hintText: "Put your text here..."
    }
}, {
    isId: true,
    priority: 100000.0048,
    key: "searchButton",
    style: {
        width: 35,
        height: 35,
        left: 10,
        image: __p.file("/images/searchXXL.png"),
        color: "#0099ff",
        borderColor: "#f9f9f9",
        borderRadius: 15,
        backgroundColor: "white"
    }
}, {
    isId: true,
    priority: 100000.0049,
    key: "resultContainer",
    style: {
        top: 15,
        height: Ti.UI.FILL
    }
}, {
    isId: true,
    priority: 100000.005,
    key: "download",
    style: {
        visible: false,
        backgroundColor: "#14141f"
    }
}, {
    isId: true,
    priority: 100000.0051,
    key: "progress",
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
    priority: 100000.0052,
    key: "result",
    style: {
        layout: "vertical"
    }
} ];