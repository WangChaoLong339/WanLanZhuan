cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.maxWidth = this.node.PathChild('frame/music/slider/background').width;
        this.musicForeground = this.node.PathChild('frame/music/slider/foreground');
        this.musicHandle = this.node.PathChild('frame/music/slider/musicHandle');
        
        this.effectForeground = this.node.PathChild('frame/effect/slider/foreground')
        this.effectHandle = this.node.PathChild('frame/effect/slider/effectHandle');
    },

    onenter(args) {
        this.setupMusic();
        this.setupEffect();
        this.setupMusicHandle();
        this.setupEffectHandle();
    },

    onleave() {
    },

    moveMusicHandle(e) {
        let val = e.progress.toFixed(1);
        AudioMgr.setMusicVolume(val);

        this.setupMusic();
    },

    moveEffectHandle(e) {
        let val = e.progress.toFixed(1);
        AudioMgr.setEffectVolume(val);

        this.setupEffect();
    },

    setupMusic() {
        this.musicForeground.width = this.maxWidth * AudioMgr.musicVolume;
    },

    setupEffect() {
        this.effectForeground.width = this.maxWidth * AudioMgr.effectVolume;
    },

    setupMusicHandle() {
        this.musicHandle.x = this.maxWidth * AudioMgr.musicVolume;
    },

    setupEffectHandle() {
        this.effectHandle.x = this.maxWidth * AudioMgr.effectVolume;
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});