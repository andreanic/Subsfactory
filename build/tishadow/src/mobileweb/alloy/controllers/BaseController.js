var Alloy = __p.require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

var Controller = function() {
    var roots = [];
    var self = this;
    function getControllerParam() {
        return self.__widgetId ? {
            widgetId: self.__widgetId,
            name: self.__controllerPath
        } : self.__controllerPath;
    }
    this.__iamalloy = true;
    _.extend(this, Backbone.Events, {
        __views: {},
        __events: [],
        __proxyProperties: {},
        setParent: function(parent) {
            var len = roots.length;
            if (!len) {
                return;
            }
            if (parent.__iamalloy) {
                this.parent = parent.parent;
            } else {
                this.parent = parent;
            }
            for (var i = 0; i < len; i++) {
                if (roots[i].__iamalloy) {
                    roots[i].setParent(this.parent);
                } else {
                    this.parent.add(roots[i]);
                }
            }
        },
        addTopLevelView: function(view) {
            roots.push(view);
        },
        addProxyProperty: function(key, value) {
            this.__proxyProperties[key] = value;
        },
        removeProxyProperty: function(key) {
            delete this.__proxyProperties[key];
        },
        getTopLevelViews: function() {
            return roots;
        },
        getView: function(id) {
            if (typeof id === "undefined" || id === null) {
                return roots[0];
            }
            return this.__views[id];
        },
        removeView: function(id) {
            delete this[id];
            delete this.__views[id];
        },
        getProxyProperty: function(name) {
            return this.__proxyProperties[name];
        },
        getViews: function() {
            return this.__views;
        },
        destroy: function() {},
        getViewEx: function(opts) {
            var recurse = opts.recurse || false;
            if (recurse) {
                var view = this.getView();
                if (!view) {
                    return null;
                } else if (view.__iamalloy) {
                    return view.getViewEx({
                        recurse: true
                    });
                } else {
                    return view;
                }
            } else {
                return this.getView();
            }
        },
        getProxyPropertyEx: function(name, opts) {
            var recurse = opts.recurse || false;
            if (recurse) {
                var view = this.getProxyProperty(name);
                if (!view) {
                    return null;
                } else if (view.__iamalloy) {
                    return view.getProxyProperty(name, {
                        recurse: true
                    });
                } else {
                    return view;
                }
            } else {
                return this.getView(name);
            }
        },
        createStyle: function(opts) {
            return Alloy.createStyle(getControllerParam(), opts);
        },
        UI: {
            create: function(apiName, opts) {
                return Alloy.UI.create(getControllerParam(), apiName, opts);
            }
        },
        addClass: function(proxy, classes, opts) {
            return Alloy.addClass(getControllerParam(), proxy, classes, opts);
        },
        removeClass: function(proxy, classes, opts) {
            return Alloy.removeClass(getControllerParam(), proxy, classes, opts);
        },
        resetClass: function(proxy, classes, opts) {
            return Alloy.resetClass(getControllerParam(), proxy, classes, opts);
        },
        updateViews: function(args) {
            var views = this.getViews();
            if (_.isObject(args)) {
                _.each(_.keys(args), function(key) {
                    var elem = views[key.substring(1)];
                    if (key.indexOf("#") === 0 && key !== "#" && _.isObject(elem) && typeof elem.applyProperties === "function") {
                        elem.applyProperties(args[key]);
                    }
                });
            }
            return this;
        },
        addListener: function(proxy, type, callback) {
            if (!proxy.id) {
                proxy.id = _.uniqueId("__trackId");
                if (_.has(this.__views, proxy.id)) {
                    __log.error("$.addListener: " + proxy.id + " was conflict.");
                    return;
                }
            }
            proxy.addEventListener(type, callback);
            this.__events.push({
                id: proxy.id,
                view: proxy,
                type: type,
                handler: callback
            });
            return proxy.id;
        },
        getListener: function(proxy, type) {
            return _.filter(this.__events, function(event, index) {
                if ((!proxy || proxy.id === event.id) && (!type || type === event.type)) {
                    return true;
                }
                return false;
            });
        },
        removeListener: function(proxy, type, callback) {
            _.each(this.__events, function(event, index) {
                if ((!proxy || proxy.id === event.id) && (!type || type === event.type) && (!callback || callback === event.handler)) {
                    event.view.removeEventListener(event.type, event.handler);
                    delete self.__events[index];
                }
            });
            return this;
        }
    });
};

module.exports = Controller;