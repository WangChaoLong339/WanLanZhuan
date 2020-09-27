const WidthCount = 6;
const HeightCount = 10;
const infoItemPreLoadCount = 20;
const MapItemType = {
    None: 0,
    My: 1,
    Enemy: 2,
}

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.mapContent = this.node.PathChild('viewRoot/mapMask/map');
        this.mapItem = this.mapContent.PathChild('mapItem');
        this.mapItem.width = this.mapContent.width / WidthCount;
        this.mapItem.height = this.mapContent.height / HeightCount;
        this.infoContent = this.node.PathChild('viewRoot/infoMask/content');
        this.infoItem = this.infoContent.PathChild('infoItem');

        this.cfg = [
            { '名字': '草原白狼', '等级': 1, '血量': 1 },
            { '名字': '人类弓手', '等级': 1, '血量': 2 },
            { '名字': '爬虫', '等级': 1, '血量': 3 },
            { '名字': '猎鹰', '等级': 2, '血量': 4 },
            { '名字': '野猪战士', '等级': 2, '血量': 5 },
            { '名字': '野猪勇士', '等级': 2, '血量': 6 },
            { '名字': '丛林战士', '等级': 3, '血量': 7 },
            { '名字': '蝎子', '等级': 3, '血量': 8 },
            { '名字': '野猪王(Boss)', '等级': 3, '血量': 9 },
            { '名字': '远古食人兽(Boss)', '等级': 4, '血量': 10 },
        ];

        this.infoItemPool = new cc.NodePool();
        this.infoItemPool.pop = function () {
            let infoItem = this.infoItemPool.get();
            if (!infoItem) {
                infoItem = cc.instantiate(this.infoItem);
            }
            return infoItem;
        }.bind(this);
        this.infoItemPreload();


        //
        window.battle = this;
    },

    infoItemPreload() {
        for (let i = 0; i < infoItemPreLoadCount; i++) {
            let infoItem = cc.instantiate(this.infoItem);
            this.infoItemPool.put(infoItem);
        }
    },

    onenter(args) {
        this.mapContent.removeAllChildren();
        this.infoContent.removeAllChildren();

        this.createMap();
        this.random();
        this.createPlayer();
        this.createEnemy();
    },

    createMap() {
        this.mapData = [];
        this.randomIdxs = [];
        for (let i = 0; i < HeightCount * WidthCount; i++) {
            this.randomIdxs.push(i);
            this.mapData.push({});
        }
    },

    random() {
        // 乱序
        for (let i = 0; i < this.randomIdxs.length; i++) {
            let ramdowI = Math.floor(Math.random() * (this.randomIdxs.length));
            if (i != ramdowI) {
                let d = this.randomIdxs[i];
                this.randomIdxs[i] = this.randomIdxs[ramdowI];
                this.randomIdxs[ramdowI] = d;
            }
        }
    },

    createPlayer() {
        let idx = this.randomIdxs.shift();
        this.mapData[idx] = {
            '名字': Player['名字'],
            '血量': Player['血量'],
            '等级': Player['等级'],
            '颜色': '#F6E873',
        };
        let mapItem = cc.instantiate(this.mapItem);
        mapItem.PathChild('nickname', cc.Label).string = `Lv${Player['等级']}.${Player['名字']}`;
        mapItem.PathChild('hp', cc.Label).string = `HP:${Player['血量']}`;
        mapItem.PathChild('background').color = cc.color(this.mapData[idx]['颜色']);
        let x = parseInt(idx % WidthCount);
        let y = parseInt(idx % HeightCount);
        mapItem.ij = { i: x, j: y };
        mapItem.position = cc.v2(x * mapItem.width + mapItem.width / 2, -y * mapItem.height - mapItem.height / 2);
        mapItem.tag = MapItemType.My;
        mapItem.parent = this.mapContent;
    },

    createEnemy() {
        for (let i = 0; i < this.cfg.length; i++) {
            let idx = this.randomIdxs.shift();
            this.mapData[idx] = {
                '名字': this.cfg[i]['名字'],
                '血量': this.cfg[i]['血量'],
                '等级': this.cfg[i]['等级'],
                '颜色': this.cfg[i]['名字'].indexOf('Boss') == -1 ? '#5AA75A' : '#9D2323',
            };

            let mapItem = cc.instantiate(this.mapItem);
            mapItem.PathChild('nickname', cc.Label).string = `Lv${this.mapData[idx]['等级']}.${this.mapData[idx]['名字']}`;
            mapItem.PathChild('hp', cc.Label).string = `HP:${this.mapData[idx]['血量']}`;
            mapItem.PathChild('background').color = cc.color(this.mapData[idx]['颜色']);
            let x = parseInt(idx % WidthCount);
            let y = parseInt(idx % HeightCount);
            mapItem.ij = { i: x, j: y };
            mapItem.position = cc.v2(x * mapItem.width + mapItem.width / 2, -y * mapItem.height - mapItem.height / 2);
            mapItem.tag = MapItemType.Enemy;
            mapItem.parent = this.mapContent;
        }
    },

    addInfo(val) {
        let infoItem = this.infoItemPool.pop();
        infoItem.PathChild('val', cc.Label).string = val;
        this.infoContent.insertChild(infoItem, 0);

        for (let i = this.infoContent.children.length - 1; i >= 0; i--) {
            let it = this.infoContent.children[i];
            if (it.y - it.height > this.infoContent.height) {
                it.PathChild('val', cc.Label).string = '';
                it.position = cc.v2(0, 0);
                this.infoContent.removeChild(it);
                this.infoItemPool.put(it);
            }
        }
    },

    btnMapItem(e) {

    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});