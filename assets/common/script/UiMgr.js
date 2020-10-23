cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        window.UiMgr = this;
        this.prefabRoot = this.node.PathChild('预制父节点');
        this.popRoot = this.node.PathChild('弹窗父节点');
        this.prefabsCache = {};
    },

    open(name, args) {
        AudioMgr.playEffect('btn_effect');
        let prafab = this.prefabsCache[name];
        if (!prafab) {
            cc.resources.load(`prefab/${name}/${name}`, (err, pb) => {
                if (err) {
                    cc.error(err);
                    return;
                }
                prafab = cc.instantiate(pb);
                prafab.parent = this.prefabRoot;
                this.prefabsCache[name] = prafab;
                prafab.active = true;
                prafab.getComponent(name).onenter && prafab.getComponent(name).onenter(args);
            })
        } else {
            prafab.active = true;
            prafab.getComponent(name).onenter && prafab.getComponent(name).onenter(args);
        }
    },

    close(name) {
        AudioMgr.playEffect('btn_effect');
        let prefab = this.prefabsCache[name];
        if (prefab) {
            prefab.getComponent(name).onleave && prefab.getComponent(name).onleave();
            prefab.active = false;
        }
    },

    showMsgAutoHide(val) {
        let name = 'MsgAutoHide';
        let prafab = this.prefabsCache[name];
        if (!prafab) {
            cc.resources.load(`prefab/${name}/${name}`, (err, pb) => {
                if (err) {
                    cc.error(err);
                    return;
                }
                prafab = cc.instantiate(pb);
                prafab.parent = this.popRoot;
                this.prefabsCache[name] = prafab;
                prafab.active = true;
                prafab.getComponent(name).show(val);
            })
        } else {
            prafab.active = true;
            prafab.getComponent(name).show(val);
        }
    },

    openMsgBox(val) {
        AudioMgr.playEffect('btn_effect');
        let name = 'MsgBox';
        let prafab = this.prefabsCache[name];
        if (!prafab) {
            cc.resources.load(`prefab/${name}/${name}`, (err, pb) => {
                if (err) {
                    cc.error(err);
                    return;
                }
                prafab = cc.instantiate(pb);
                this.popRoot.insertChild(prafab, 0);
                this.prefabsCache[name] = prafab;
                prafab.active = true;
                prafab.getComponent(name).show(val);
            })
        } else {
            prafab.active = true;
            prafab.getComponent(name).show(val);
        }
    },

    closeMsgBox() {
        AudioMgr.playEffect('btn_effect');
        let name = 'MsgBox';
        let prefab = this.prefabsCache[name];
        if (prefab) {
            prefab.getComponent(name).onleave && prefab.getComponent(name).onleave();
            prefab.active = false;
        }
    },
});