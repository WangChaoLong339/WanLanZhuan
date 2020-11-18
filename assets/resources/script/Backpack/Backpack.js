const MaxTabItemCount = 5;
const MaxPageItemCount = 8;
const pageItemDefaultCount = MaxPageItemCount * 15;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.tabs = this.node.PathChild('tabs');
        this.tabItem = this.node.PathChild('tabs/tabItem');
        this.tabs.removeAllChildren();
        let tabItemWidth = parseInt((this.tabs.width - 20) / MaxTabItemCount);
        this.tabItem.width = tabItemWidth;
        this.tabItem.height = tabItemWidth / 2;

        this.pages = this.node.PathChild('pages/view/content');
        this.pageItem = this.node.PathChild('pages/view/content/item');
        this.pages.removeAllChildren();
        let pageItemWidth = parseInt(this.pages.width / MaxPageItemCount);
        this.pageItem.width = pageItemWidth;
        this.pageItem.height = pageItemWidth;

        this.model = {
            currTabIdx: 0,
        };

        this.pageItemPool = new cc.NodePool(this.pageItem);
        this.pageItemPool.__proto__.push = function (item) {
            this.pageItemPool.put(item);
        }.bind(this);
        this.pageItemPool.__proto__.pop = function () {
            let item = this.pageItemPool.get();
            if (!item) {
                item = cc.instantiate(this.pageItem);
            }
            return item;
        }.bind(this);
        // 创建背包格子内存池
        this.createPageItemPool();
        // 创建分页栏
        this.createTab();
        // 创建背包格子
        this.createPage();
    },

    onenter(args) {
        this.model.backpack = Player['背包'];
        this.updateTop();
        this.updateTab();
        this.updatePage();
    },

    createPageItemPool() {
        for (let i = 0; i < pageItemDefaultCount; i++) {
            this.pageItemPool.put(cc.instantiate(this.pageItem));
        }
    },

    createTab() {
        let titles = ['全部', '消耗类', '材料类', '装备类', '其他类'];
        for (let i = 0; i < titles.length; i++) {
            let tabItem = cc.instantiate(this.tabItem);
            tabItem.getComponent('MultiFrame').setFrame(i == this.model.currTabIdx ? 0 : 1);
            tabItem.PathChild('val', cc.Label).string = titles[i];
            tabItem.idx = i;
            tabItem.parent = this.tabs;
        }
    },

    createPage() {
        for (let i = 0; i < pageItemDefaultCount; i++) {
            let pageItem = this.pageItemPool.pop();
            pageItem.idx = i;
            pageItem.parent = this.pages;
        }
    },

    updateTop() {
        this.node.PathChild('top/coin/val').color = cc.color(Consume['金币'].color);
        this.node.PathChild('top/coin/val', cc.Label).string = Player['金币'];
        this.node.PathChild('top/diam/val').color = cc.color(Consume['钻石'].color);
        this.node.PathChild('top/diam/val', cc.Label).string = Player['钻石'];
    },

    updateTab() {
        for (let i = 0; i < this.tabs.children.length; i++) {
            this.tabs.children[i].getComponent('MultiFrame').setFrame(i == this.model.currTabIdx ? 0 : 1);
        }
    },

    updatePage() {
        this.pageItemClear();
        let backpack = this.getBackpack();
        for (let i = 0; i < backpack.length; i++) {
            let pageItem = this.pages.children[i];
            SetSpriteFrame(`ui/Prop/${backpack[i]['编号']}`, pageItem.PathChild('icon', cc.Sprite));
            pageItem.PathChild('val', cc.Label).string = backpack[i]['数量'];
        }
    },

    pageItemClear() {
        for (let i = 0; i < this.pages.children.length; i++) {
            let pageItem = this.pages.children[i];
            SetSpriteFrame(null, pageItem.PathChild('icon', cc.Sprite));
            pageItem.PathChild('val', cc.Label).string = '';
        }
    },

    getBackpack() {
        if (this.model.currTabIdx == 0) {
            return this.model.backpack;
        }
        let backpack = [];
        let titles = ['全部', '消耗类', '材料类', '装备类', '其他类'];
        for (let i = 0; i < this.model.backpack.length; i++) {
            let prop = PropCtrl.getPropById(this.model.backpack[i]['编号']);
            if (prop['类型'] == titles[this.model.currTabIdx]) {
                backpack.push(this.model.backpack[i]);
            }
        }
        return backpack;
    },

    btnTabItem(e) {
        if (this.model.currTabIdx == e.target.idx) {
            return;
        }
        this.node.PathChild('pages', cc.ScrollView).scrollToTop();
        this.model.currTabIdx = e.target.idx;

        this.updateTab();
        this.updatePage();
    },

    btnPageItem(e) {
    },

    btnItem(e) {
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});