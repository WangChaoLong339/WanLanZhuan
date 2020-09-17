cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.tabs = this.node.PathChild('tabs');
        this.tabItem = this.node.PathChild('tabs/tabItem');

        this.model = {
            config: [
                { title: '消耗', },
                { title: '材料', },
                { title: '进阶', },
                { title: '特殊', },
            ],
        };
    },

    onenter(args) {
        this.show();
    },

    show() {
        this.tabs.removeAllChildren();
        config.forEach((it, idx) => {
            let tabItem = cc.instantiate(this.tabItem);
            tabItem.PathChild('val', cc.Label).string = it.title;
            tabItem.idx = idx;
            tabItem.parent = this.tabs;
        });
    },

    btnTabItem(e) {

    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});