cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.tabs = this.node.PathChild('tabs');
        this.tabItem = this.node.PathChild('tabs/tabItem');
        this.pages = this.node.PathChild('pages');
        this.pageItem = this.node.PathChild('pages/pageItem');

        this.model = {
            curIdx: 0,
            info: [
                { title: '消耗', list: [{ name: '红药水', val: 1 }, { name: '蓝药水', val: 2 }, { name: '紫药水', val: 4 }] },
                { title: '材料', list: [{ name: '木材', val: 1 }, { name: '乌木', val: 5 }] },
                { title: '进阶', list: [] },
                { title: '特殊', list: [{ name: '水晶', val: 100 }] },
            ],
        };

        cc.resources.load('config/shopConfig', (err, data) => {
            cc.log(JSON.stringify(data));
            cc.log('-------------------------')
            cc.log(data);
        })
    },

    onenter(args) {
        return;
        this.setupTabs();
        this.setupPage();
    },

    setupTabs() {
        this.tabs.removeAllChildren();
        this.model.info.forEach((it, idx) => {
            let tabItem = cc.instantiate(this.tabItem);
            let color = idx == this.model.curIdx ? cc.color('#304FBC') : cc.color('#476774');
            tabItem.PathChild('background').color = color;
            tabItem.PathChild('val', cc.Label).string = it.title;
            tabItem.idx = idx;
            tabItem.parent = this.tabs;
        });
    },

    setupPage() {
        this.pages.removeAllChildren();
        this.model.info[this.model.curIdx].list.forEach((it, idx) => {
            let pageItem = cc.instantiate(this.pageItem);
            pageItem.PathChild('val', cc.Label).string = it.val;
            pageItem.idx = idx;
            pageItem.parent = this.pages;
        });
    },

    btnTabItem(e) {
        this.model.curIdx = e.target.idx;
        this.setupTabs();
        this.setupPage();
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});