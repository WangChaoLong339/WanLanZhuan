cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.maxWidth = this.node.PathChild('frame/music/slider/background').width;
        this.musicHandel = this.node.PathChild('frame/music/slider/handle');
        this.effectHandel = this.node.PathChild('frame/effect/slider/handle');
    },

    onenter(args) {
    },

    onleave() {
    },

    moveMusicHandle(e) {
        this.node.PathChild('frame/music/slider/foreground').width = this.musicHandel.x;
        let val = e.progress.toFixed(2);
        cc.audioEngine.setMusicVolume(val);
    },

    moveEffectHandle(e) {
        this.node.PathChild('frame/effect/slider/foreground').width = this.effectHandel.x;
        let val = e.progress.toFixed(2);
        cc.audioEngine.setEffectsVolume(val);
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});