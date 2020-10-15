cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.title = this.node.PathChild('foreground/title', cc.Label);
        this.info = this.node.PathChild('foreground/info', cc.Label);
        this.btn0 = this.node.PathChild('foreground/btns/btn0');
        this.btn0Name = this.node.PathChild('foreground/btns/btn0/val', cc.Label);
        this.btn1 = this.node.PathChild('foreground/btns/btn1');
        this.btn1Name = this.node.PathChild('foreground/btns/btn1/val', cc.Label);
    },

    show(args) {
        this.title.string = args.title || '系统提示';
        this.info.string = args.info || 'error';
        this.btn0.active = !!args.func;
        this.btn0Name.string = args.btn0Name || '确认';
        this.btn1Name.string = args.btn1Name || '取消';
        this.func = args.func || function () { };
    },

    btnBtn0() {
        this.func();
        UiMgr.closeMsgBox();
    },

    btnBtn1() {
        UiMgr.closeMsgBox();
    },
});