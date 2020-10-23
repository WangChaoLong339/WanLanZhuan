cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        window.AudioMgr = this;

        let mV = GetLocalStorage(`${GameName}_music_volume`);
        let eV = GetLocalStorage(`${GameName}_effect_volume`);
        this.musicVolume = mV ? parseFloat(mV) : 1;
        this.effectVolume = eV ? parseFloat(eV) : 1;
        cc.audioEngine.setMusicVolume(this.musicVolume);
        cc.audioEngine.setEffectsVolume(this.effectVolume);
        this.model = { prefix: 'sound/', cache: {}, musicId: null };
        this.playMusic('bgm_home');
    },

    setMusicVolume(val) {
        this.musicVolume = val;
        cc.audioEngine.setMusicVolume(val);
        SetLocalStorage(`${GameName}_music_volume`, val);
    },

    setEffectVolume(val) {
        this.effectVolume = val;
        cc.audioEngine.setEffectsVolume(val);
        SetLocalStorage(`${GameName}_effect_volume`, val);
    },

    playEffect(fileName) {
        if (this.effectVolume == 0) { return }
        let path = this.model.prefix + fileName;
        if (this.model.cache[path]) {
            return cc.audioEngine.play(this.model.cache[path], false, this.effectVolume);
        }
        let self = this;
        cc.resources.load(path, cc.AudioClip, null, function (err, clip) {
            if (err) {
                return cc.error(err);
            }
            self.model.cache[path] = clip;
            cc.audioEngine.play(clip, false, this.effectVolume);
        });
    },

    stopEffect(fileName) {
    },

    // 开始播放背景音乐
    playMusic(fileName) {
        this.stopMusic();
        let path = this.model.prefix + fileName;
        if (this.model.cache[path]) {
            return cc.audioEngine.playMusic(this.model.cache[path], true);
        }
        let self = this;
        cc.resources.load(path, cc.AudioClip, null, function (err, clip) {
            if (err) {
                return cc.error(err);
            }
            self.model.cache[path] = clip;
            cc.audioEngine.playMusic(clip, true);
        });
    },

    // 停止播放背景音乐
    stopMusic() {
        cc.audioEngine.stopMusic();
    },

    // 暂停播放背景音乐
    pauseMusic() {
        cc.audioEngine.pauseMusic();
    },

    // 继续播放背景音乐
    resumeMusic() {
        cc.audioEngine.resumeMusic();
    },
});
