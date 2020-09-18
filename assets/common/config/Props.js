let papa = require("papaparse.min");

cc.Class({
    extends: cc.Component,

    properties: {
        propType: cc.TextAsset,
        propList: cc.TextAsset,
    },

    onLoad() {
        window.PropType = this.PropType;
        window.Props = this.Props;

        this._initType();
        this._initCfg();
    },

    _initType() {
        this.PropType = {};

        let data = papa.parse(this.propType.text).data;
        for (let i = 0; i < data.length; i += 4) {
            // 过滤空行
            if (data[i][0] != '') {
                let type = data[i][0]
                this.PropType[type] = {};
                for (let j = 0; j < data[i + 1].length; j++) {
                    if (data[i + 1][j] != '') {
                        this.PropType[type][data[i + 1][j]] = data[i + 2][j];
                    }
                }
            }
        }

        cc.log(this.PropType);
    },

    _initCfg() {
        this.Props = {};

        let data = papa.parse(this.propList.text).data;
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

        cc.log(this.Props);
    }
});
