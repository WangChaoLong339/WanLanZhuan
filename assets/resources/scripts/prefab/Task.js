cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
    },

    onenter: function (args) {
    },

    btnClose: function () {
        UiMgr.close(this.node.name)
    },
});
