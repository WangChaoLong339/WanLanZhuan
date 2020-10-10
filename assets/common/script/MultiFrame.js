cc.Class({
    extends: cc.Component,

    properties: {
        frames: [cc.SpriteFrame],
    },

    onLoad() {
    },

    setFrame: function (idx) {
        cc.assert(idx < this.frames.length);
        let sp = this.getComponent(cc.Sprite);
        sp.spriteFrame = this.frames[idx];
    },
});