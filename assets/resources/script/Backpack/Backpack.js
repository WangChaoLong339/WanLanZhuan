const MaxTabItemCount = 5;
const MaxPageItemCount = 10;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.tabs = this.node.PathChild('tabs');
        this.tabItem = this.node.PathChild('tabs/tabItem');
        this.tabs.removeAllChildren();
        let tabItemWidth = (this.tabs.width - 20) / MaxTabItemCount;
        this.tabItem.width = tabItemWidth;
        this.tabItem.height = tabItemWidth / 2;

        this.pages = this.node.PathChild('pages/view/content');
        this.pageItem = this.node.PathChild('pages/view/content/item');
        this.pages.removeAllChildren();

        this.model = {
            currTabIdx: 0,
        };
        // 创建分页栏
        this.createTabs();
    },

    onenter(args) {
    },

    createTabs() {
        let titles = ['全部', '消耗类', '材料类', '装备类', '其他类'];
        for (let i = 0; i < titles.length; i++) {
            let tabItem = cc.instantiate(this.tabItem);
            tabItem.getComponent('MultiFrame').setFrame(i == this.model.currTabIdx ? 0 : 1);
            tabItem.PathChild('val', cc.Label).string = titles[i];
            tabItem.idx = i;
            tabItem.parent = this.tabs;
        }
    },

    createPages() {

    },

    updateTabs() {
        for (let i = 0; i < this.tabs.children.length; i++) {
            this.tabs.children[i].getComponent('MultiFrame').setFrame(i == this.model.currTabIdx ? 0 : 1);
        }
    },

    btnTabItem(e) {
        if (this.model.currTabIdx == e.target.idx) {
            return;
        }
        this.model.currTabIdx = e.target.idx;
        this.updateTabs();
    },

    btnPageItem(e) {
    },

    btnItem(e) {
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});