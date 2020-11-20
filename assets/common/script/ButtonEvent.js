cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
    },

    // 设置
    btnSetting() {
        UiMgr.open('Setting');
    },

    // 藏宝阁
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