cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        cc.tween(this.node)
            .delay(0.1)
            .call(() => { AudioMgr.playMusic('bgm_home'); })
            .start();
    },

    onEnable() {
        let player = GetLocalStorage('WanLanZhuan-Player');
        if (!player) {
            player = {
                '名字': '晚澜',
                '血量': 100,
                '等级': 1,
                '金币': 8846,
                '钻石': 213,
                '经验': 0,
                '背包': [
                    { '编号': 10000, '数量': 10 },
                    { '编号': 10001, '数量': 3 },
                    { '编号': 20000, '数量': 5 },
                ],
            };
            SetLocalStorage('WanLanZhuan-Player', player);
        }

        window.Player = player;
    },

    onDisable() {
    },
});