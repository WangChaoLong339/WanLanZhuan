const WidthCount = 5;
const HeightCount = 8;
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.mapContent = this.node.PathChild('view/background/map');
        this.mapItem = this.mapContent.PathChild('mapItem');
        this.mapItem.width = this.mapContent.width / WidthCount;
        this.mapItem.height = this.mapContent.height / HeightCount;
        this.infoScrollView = this.node.PathChild('view/infoScrollView');
        this.infoContent = this.infoScrollView.getComponent(cc.ScrollView).content;
        this.infoItem = this.infoContent.PathChild('infoItem');
        this.infoContent.removeAllChildren();

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
    },

    onenter(args) {
        this.mapContent.removeAllChildren();

        this.createMap();
        this.createPlayer();
        this.createEnemy();
    },

    createMap() {
        this.mapData = [];
        this.randomIdx = [];
        for (let i = 0; i < HeightCount * WidthCount; i++) {
            this.randomIdx.push(i);
            this.mapData.push([]);
        }
    },

    random() {
        // 乱序
        for (let i = 0; i < this.randomIdx.length; i++) {
            let ramdowI = Math.floor(Math.random() * (this.randomIdx.length));
            if (i != ramdowI) {
                let d = this.randomIdx[i];
                this.randomIdx[i] = this.randomIdx[ramdowI];
                this.randomIdx[ramdowI] = d;
            }
        }
    },

    createPlayer() {
        let idx = this.randomIdx.shift();
        this.mapData[idx] = {
            '名字': Player['名字'],
            '血量': Player['血量'],
            '等级': Player['等级'],
            '颜色': '#71661F',
        };
        let mapItem = cc.instantiate(this.mapItem);
        mapItem.PathChild('nickname', cc.Label).string = `Lv${Player['等级']}.${Player['名字']}`;
        mapItem.PathChild('hp', cc.Label).string = `HP:${Player['血量']}`;
        mapItem.PathChild('background').color = cc.color(this.mapData[idx]['颜色']);
        let x = parseInt(this.mapData[idx] % WidthCount);
        let y = parseInt(this.mapData[idx] % HeightCount);
        mapItem.position = cc.v2(x * mapItem.width + mapItem.width / 2, -y * mapItem.height - mapItem.height / 2);
        mapItem.parent = this.mapContent;
    },

    createEnemy() {
        for (let i = 0; i < this.cfg.length; i++) {
            let idx = this.randomIdx.shift();
            this.mapData[idx] = {
                '名字': this.cfg[i]['名字'],
                '血量': this.cfg[i]['血量'],
                '等级': this.cfg[i]['等级'],
                '颜色': this.cfg[i]['名字'].indexOf('Boss') == -1 ? '#5AA75A' : '#9D2323',
            };

            let mapItem = cc.instantiate(this.mapItem);
            mapItem.PathChild('nickname', cc.Label).string = `Lv${this.cfg[i]['等级']}.${this.mapData[idx]['名字']}`;
            mapItem.PathChild('hp', cc.Label).string = `HP:${this.mapData[idx]['血量']}`;
            mapItem.PathChild('background').color = cc.color(this.mapData[idx]['颜色']);
            let x = parseInt(this.mapData[i + 1] % WidthCount);
            let y = parseInt(this.mapData[i + 1] % HeightCount);
            mapItem.position = cc.v2(x * mapItem.width + mapItem.width / 2, -y * mapItem.height - mapItem.height / 2);
            mapItem.parent = this.mapContent;
        }
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});