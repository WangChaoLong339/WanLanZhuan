cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {},

    // 任务
    btnTask() {
        UiMgr.open('Task');
    },

    // 帮助
    btnHelp() {
        UiMgr.open('Help');
    },

    // 属性
    btnAttribute() {},

    // 背包
    btnKnapsack() {},

    // 进阶
    btnSenior() {},

    // 商城
    btnShop() {
        UiMgr.open('Shop');
    },
});