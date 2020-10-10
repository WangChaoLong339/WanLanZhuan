cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
    },

    onEnable() {
        let player = GetLocalStorage('WanLanZhuan-Player');
        if (!player) {
            player = {
                '名字': '晚澜',
                '血量': 100,
                '等级': 1,
                '金币': 0,
                '经验': 0,
                '背包': [],
            };
            SetLocalStorage('WanLanZhuan-Player', player);
        }

        window.Player = player;
    },

    onDisable() {
    },

    start() {
        AudioMgr.playMusic('sound/zhucheng');
    },
});