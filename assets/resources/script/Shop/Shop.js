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

        this.box = this.node.PathChild('box');

        this.model = {
            curType: null,
            info: [],
        };
    },

    onenter(args) {
        // 拿到商城配置列表数据 然后在刷新界面
        this.model.info = PropCtrl.Shop || {};

        this.hideBox();
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
            let t = PropCtrl.getPropById(this.model.info[i][0]['编号'])['类型'];
            tabItem.PathChild('background', 'MultiFrame').setFrame(t == this.model.curType ? 0 : 1);
            tabItem.PathChild('val', cc.Label).string = i;
            tabItem['类型'] = i;
            tabItem.parent = this.tabs;
        }
    },

    setupPage() {
        this.pages.removeAllChildren();
        this.model.info[this.model.curType].forEach((it, idx) => {
            let pageItem = cc.instantiate(this.pageItem);
            let prop = PropCtrl.getPropById(it['编号']);
            pageItem.PathChild('title', cc.Label).string = prop['名字'];
            pageItem.PathChild('title').color = cc.color(PropCtrl.gradeToColor(prop['品级']));
            pageItem.PathChild('describe', cc.Label).string = prop['描述'];
            pageItem.PathChild('val', cc.Label).string = `${it['消耗类型']}:${it['消耗数值']}`;
            pageItem.idx = idx;
            pageItem.parent = this.pages;
        });
    },

    showBox(prop) {
        this.box.PathChild('background/title').color = cc.color(PropCtrl.gradeToColor(prop['品级']));
        this.box.PathChild('background/title', cc.Label).string = prop['名字'];
        this.box.PathChild('background/discribe', cc.Label).string = prop['描述'];
        this.box.active = true;
    },

    hideBox() {
        this.box.active = false;
    },

    btnTabItem(e) {
        this.model.curType = e.target['类型'];
        this.setupTabs();
        this.setupPage();
    },

    btnPageItem(e) {
        let prop = PropCtrl.getPropById(this.model.info[this.model.curType][e.target.idx]['编号']);
        this.showBox(prop);
    },

    btnBuyProp(e, data) {
        cc.log('购买: ' + parseInt(data));
    },

    btnCloseBox(e) {
        this.hideBox();
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});