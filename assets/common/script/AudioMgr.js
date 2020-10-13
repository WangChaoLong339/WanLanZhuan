class AudioMgr {
    constructor() {
        this.model = { prefix: 'sound/', cache: {}, musicId: null };
    }

    get soundVolume() {
        return Sound.soundVolume;
    }

    set soundVolume(percent) {
        Sound.soundVolume = Math.max(0, Math.min(1, percent))
        cc.audioEngine.setEffectsVolume(Sound.soundVolume)
    }

    get musicVolume() {
        return Sound.musicVolume
    }

    set musicVolume(percent) {
        Sound.musicVolume = Math.max(0, Math.min(1, percent))
        cc.audioEngine.setMusicVolume(Sound.musicVolume)
    }

    get soundEnable() {
        return this.soundVolume > 0
    }

    get musicEnable() {
        return this.musicVolume > 0
    }

    set soundEnable(val) {
        this.soundVolume = val ? 0.5 : 0
    }

    set musicEnable(val) {
        this.musicVolume = val ? 0.5 : 0
    }

    playSound(fileName) {
        let path = this.model.prefix + fileName;
        if (this.model.cache[path]) {
            return cc.audioEngine.play(this.model.cache[path], false, 0.5);
        }
        let self = this;
        cc.resources.load(path, cc.AudioClip, null, function (err, clip) {
            if (err) {
                return cc.error(err);
            }
            self.model.cache[path] = clip;
            cc.audioEngine.play(clip, false, 0.5);
        });
    }

    stopSound(file) {
    }

    // 开始播放背景音乐
    playMusic(fileName) {
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
    }
    // 停止播放背景音乐
    stopMusic() {
        cc.audioEngine.stopMusic();
    }
    // 暂停播放背景音乐
    pauseMusic() {
        cc.audioEngine.pauseMusic();
    }
    // 继续播放背景音乐
    resumeMusic() {
        cc.audioEngine.resumeMusic();
    }
}

window.AudioMgr = new AudioMgr()
