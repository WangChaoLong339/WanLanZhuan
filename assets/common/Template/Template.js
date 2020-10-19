cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);
    },

    onenter(args) {
    },

    onleave() {
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});