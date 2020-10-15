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
        };
    },

    onenter(args) {
        AudioMgr.playMusic('bgm_shop');

        // 拿到商城配置列表数据 然后在刷新界面
        this.model.info = PropCtrl.Shop || {};

        this.updateTop();
        this.setupCurType();
        this.setupTabs();
        this.setupPage();
    },

    onleave() {
        AudioMgr.playMusic('bgm_home');
    },

    updateTop() {
        this.node.PathChild('top/coin/val').color = cc.color(Consume['金币'].color);
        this.node.PathChild('top/coin/val', cc.Label).string = Player['金币'];
        this.node.PathChild('top/diam/val').color = cc.color(Consume['钻石'].color);
        this.node.PathChild('top/diam/val', cc.Label).string = Player['钻石'];
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
            pageItem.PathChild('val', cc.Label).string = `${it['消耗']}`;
            pageItem.PathChild('val').color = cc.color(Consume[it['消耗类型']].color);
            pageItem.PathChild('valIcon', 'MultiFrame').setFrame(Consume[it['消耗类型']].id);
            pageItem.PathChild('count', cc.Label).string = `${it['数量']}`;
            SetSpriteFrame(`ui/Prop/${it['编号']}`, pageItem.PathChild('icon', cc.Sprite));
            pageItem.idx = idx;
            pageItem.parent = this.pages;
        });
    },

    btnTabItem(e) {
        if (this.model.curType == e.target['类型']) {
            return;
        }
        this.model.curType = e.target['类型'];
        this.setupTabs();
        this.setupPage();
    },

    btnBuy(e) {
        let prop = this.model.info[this.model.curType][e.target.parent.idx];
        let propName = PropCtrl.getPropById(prop['编号'])['名字'];
        let totalConsume = parseInt(prop['消耗']);
        UiMgr.openMsgBox({
            title: '温馨提示',
            info: `消耗[${prop['消耗类型']}]X${totalConsume}购买${propName}X${prop['数量']}`,
            btn0Name: '购买',
            btn1Name: '取消',
            func: () => { },
        });
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});