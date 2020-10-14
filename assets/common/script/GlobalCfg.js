cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        // 遍历子节点
        cc.Node.prototype.PathChild = function (path, componentName) {
            let names = path.split('/');
            let nd = null;
            for (let i = 0; i < names.length; i++) {
                if (nd) {
                    nd = nd.getChildByName(names[i]);
                } else {
                    nd = this.getChildByName(names[i]);
                }
            }
            if (componentName) {
                return nd.getComponent(componentName);
            } else {
                return nd;
            }
        }

        /* *************************************************************************************************************** */

        // 全局音量
        window.Sound = { musicVolume: 1, soundVolume: 1, };

        // 消耗货币颜色
        window.Consume = {
            '金币': { id: 0, color: '#ffffff' },
            '钻石': { id: 1, color: '#2F41E3' },
        }

        // 动态添加精灵图片
        window.SetSpriteFrame = function (path, sprite) {
            if (!path) {
                sprite.spriteFrame = null;
                return;
            }
            cc.resources.load(path, cc.SpriteFrame, null, function (err, spriteFrame) {
                if (err) {
                    cc.error(err);
                    return;
                }
                sprite.spriteFrame = spriteFrame;
            })
        }

        // 记录一个进入游戏的时间
        window.EnterGameTime = new Date().getTime() / 1000;

        // 记录屏幕Size
        window.WinSize = cc.winSize;

        // 克隆数据
        window.Clone = function (obj) {
            return JSON.parse(JSON.stringify(obj));
        }

        // 设置本地缓存
        window.SetLocalStorage = function (key, data) {
            cc.sys.localStorage.setItem(key, JSON.stringify(data));
        }

        // 获取本地缓存
        window.GetLocalStorage = function (key) {
            let data = cc.sys.localStorage.getItem(key);
            if (data) {
                return JSON.parse(data);
            }
            return null;
        }
    },
});