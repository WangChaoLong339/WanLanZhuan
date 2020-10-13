cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        // 帮助按钮
        cc.tween(this.node.PathChild('help/val'))
            .repeatForever(cc.tween()
                .to(1, { scaleX: 0 })
                .to(1, { scaleX: -1 })
                .to(1, { scaleX: 0 })
                .to(1, { scaleX: 1 })
            )
            .start();
        // 野外按钮
        let maxScale = 1.1;
        let minScale = 0.9;
        cc.tween(this.node.PathChild('battle/val'))
            .repeatForever(cc.tween()
                .to(0.1, { scale: maxScale })
                .to(0.1, { scale: 1 })
                .to(0.1, { scale: minScale })
                .to(0.1, { scale: 1 })
                .to(0.1, { scale: maxScale })
                .to(0.1, { scale: 1 })
                .to(0.1, { scale: minScale })
                .to(0.1, { scale: 1 })
                .delay(1)
            )
            .start();
        // 宝藏按钮
        cc.tween(this.node.PathChild('treasure/val'))
            .repeatForever(cc.tween()
                .to(0.1, { scale: maxScale })
                .to(0.1, { scale: 1 })
                .to(0.1, { scale: minScale })
                .to(0.1, { scale: 1 })
                .to(0.1, { scale: maxScale })
                .to(0.1, { scale: 1 })
                .to(0.1, { scale: minScale })
                .to(0.1, { scale: 1 })
                .delay(1)
            )
            .start();
    },

    //
    btnTreasure() {
        UiMgr.open('Treasure');
    },

    // 任务
    btnTask() {
        UiMgr.open('Task');
    },

    // 野外
    btnBattle() {
        UiMgr.open('Battle');
    },

    // 帮助
    btnHelp() {
        UiMgr.open('Help');
    },

    // 属性
    btnAttribute() {
    },

    // 背包
    btnBackpack() {
        UiMgr.open('Backpack');
    },

    // 进阶
    btnSenior() {
    },

    // 商城
    btnShop() {
        UiMgr.open('Shop');
    },
});