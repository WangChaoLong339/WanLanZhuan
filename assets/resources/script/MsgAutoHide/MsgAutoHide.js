const itemPreLoadCount = 20;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.layout = this.node.PathChild('layout');
        this.item = this.node.PathChild('layout/item');
        this.layout.removeAllChildren();

        this.pool = new cc.NodePool();

        this.itemPreload();
    },

    itemPreload() {
    },

    show() {
    },
});
