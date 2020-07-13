cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
    },

    onenter: function (args) {
    },

    btnReturn: function () {
        UiMgr.close(this.node.name)
    },
});
