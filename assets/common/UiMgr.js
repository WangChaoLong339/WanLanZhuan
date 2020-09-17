cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        window.UiMgr = this
        this.prefabRoot = this.node.PathChild('预制父节点')
        this.propRoot = this.node.PathChild('弹窗父节点')
        this.prefabsCache = {}
    },

    open: function (name, args) {
        let prafab = this.prefabsCache[name]
        if (!prafab) {
            let self = this
            cc.loader.loadRes(`prefab/${name}`, cc.Prefab, function (err, pb) {
                if (err) {
                    cc.error(err)
                    return
                }
                prafab = cc.instantiate(pb)
                prafab.parent = self.prefabRoot
                self.prefabsCache[name] = prafab
                prafab.active = true
                prafab.getComponent(name).onenter && prafab.getComponent(name).onenter(args)
            })
        } else {
            prafab.active = true
            prafab.getComponent(name).onenter && prafab.getComponent(name).onenter(args)
        }
    },

    close: function (name) {
        let prefab = this.prefabsCache[name]
        if (prefab) {
            prefab.getComponent(name).onleave && prefab.getComponent(name).onleave()
            prefab.active = false
        }
    },
});
