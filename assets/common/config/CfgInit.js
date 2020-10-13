let papa = require("papaparse.min");

cc.Class({
    extends: cc.Component,

    properties: {
        grade: cc.TextAsset,
        props: cc.TextAsset,
        shop: cc.TextAsset,
    },

    onLoad() {
        // 品级颜色
        this._initGrade();
        // 所有道具 object
        this._initProps();
        // 商城道具 array
        this._initShop();

        window.PropCtrl = this;
    },

    _initGrade() {
        this.Grade = {};
        let data = papa.parse(this.grade.text).data;
        let title = data.shift();
        for (let i = 0; i < data.length; i++) {
            // 过滤空行
            if (data[i][0] != '') {
                this.Grade[data[i][0]] = {};
                for (let j = 0; j < title.length; j++) {
                    this.Grade[data[i][0]][title[j]] = data[i][j];
                }
            }
        }
    },

    _initProps() {
        this.Props = {};

        let data = papa.parse(this.props.text).data;
        let title = data.shift();
        for (let i = 0; i < data.length; i++) {
            // 过滤空行
            if (data[i][0] != '') {
                this.Props[data[i][0]] = {};
                for (let j = 0; j < title.length; j++) {
                    this.Props[data[i][0]][title[j]] = data[i][j];
                }
            }
        }
    },

    _initShop() {
        this.Shop = [];
        let data = papa.parse(this.shop.text).data;
        let title = data.shift();
        for (let i = 0; i < data.length; i++) {
            let d = data[i];
            // 过滤空行
            if (d[0] != '') {
                let l = {};
                for (let j = 0; j < title.length; j++) {
                    l[title[j]] = d[j];
                }
                let p = this.getPropById(d[0]);
                if (!this.Shop[p['类型']]) {
                    this.Shop[p['类型']] = [];
                }
                this.Shop[p['类型']].push(l);
            }
        }
    },

    getPropById(id) {
        if (!this.Props[id]) {
            return cc.error(`${this.Props} not contain ${id}`);
        }
        return this.Props[id];
    },

    gradeToColor(grade) {
        return this.Grade[grade]['颜色'];
    },
});
