cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.mapContent = this.node.PathChild('view/map');
        this.infoScrollView = this.node.PathChild('view/infoScrollView');
        this.infoContent = this.infoScrollView.getComponent(cc.ScrollView).content;
        this.infoItem = this.infoContent.PathChild('infoItem');
        this.infoContent.removeAllChildren();
    },

    onenter(args) {
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});