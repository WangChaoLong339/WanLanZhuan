cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);
    },

    onenter(args) {
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});