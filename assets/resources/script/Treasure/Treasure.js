cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);
    },

    onenter(args) {
        AudioMgr.playMusic('bgm_treasure');

        this.updateTop();
    },

    onleave() {
        AudioMgr.playMusic('bgm_home');
    },

    updateTop() {
        this.node.PathChild('top/coin/val').color = cc.color(Consume['金币'].color);
        this.node.PathChild('top/coin/val', cc.Label).string = Player['金币'];
        this.node.PathChild('top/diam/val').color = cc.color(Consume['钻石'].color);
        this.node.PathChild('top/diam/val', cc.Label).string = Player['钻石'];
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});