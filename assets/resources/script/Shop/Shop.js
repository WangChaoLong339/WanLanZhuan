cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.tabs = this.node.PathChild('tabs');
        this.tabItem = this.node.PathChild('tabs/tabItem');
        this.tabs.removeAllChildren();
        this.pages = this.node.PathChild('pages/view/content');
        this.pageItem = this.node.PathChild('pages/view/content/pageItem');
        this.pages.removeAllChildren();

        this.model = {
            curType: null,
            info: [],
            color: {
                'checked': cc.color('#304FBC'),
                'unchecked': cc.color('#476774'),
            },
        };
    },

    onenter(args) {
        // 拿到商城配置列表数据 然后在刷新界面
        this.model.info = PropCtrl.Shop || {};

        this.setupCurType();
        this.setupTabs();
        this.setupPage();
    },

    setupCurType() {
        this.model.curType = null;
        for (let i in this.model.info) {
            this.model.curType = i;
            break;
        }
    },

    setupTabs() {
        this.tabs.removeAllChildren();
        for (let i in this.model.info) {
            let tabItem = cc.instantiate(this.tabItem);
            let t = PropCtrl.getIdToProp(this.model.info[i][0]['编号'])['类型'];
            tabItem.PathChild('background').color = t == this.model.curType ? this.model.color['checked'] : this.model.color['unchecked'];
            tabItem.PathChild('val', cc.Label).string = i;
            tabItem['类型'] = i;
            tabItem.parent = this.tabs;
        }
    },

    setupPage() {
        this.pages.removeAllChildren();
        this.model.info[this.model.curType].forEach((it, idx) => {
            let pageItem = cc.instantiate(this.pageItem);
            let prop = PropCtrl.getIdToProp(it['编号']);
            pageItem.PathChild('title', cc.Label).string = prop['名字'];
            pageItem.PathChild('title').color = cc.color(prop['颜色']);
            pageItem.PathChild('describe', cc.Label).string = prop['描述'];
            pageItem.PathChild('val', cc.Label).string = `${it['消耗类型']}:${it['消耗数值']}`;
            pageItem.idx = idx;
            pageItem.parent = this.pages;
        });
    },

    btnTabItem(e) {
        this.model.curType = e.target['类型'];
        this.setupTabs();
        this.setupPage();
    },

    btnPageItem(e) {
        cc.log(e.target.idx);
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});