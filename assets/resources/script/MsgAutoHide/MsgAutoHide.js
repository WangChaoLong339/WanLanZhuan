const itemPreLoadCount = 20;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.layout = this.node.PathChild('layout');
        this.item = this.node.PathChild('layout/item');
        this.layout.removeAllChildren();

        this.pool = new cc.NodePool();
        this.pool.pop = () => {
            let item = this.pool.get();
            if (!item) {
                item = cc.instantiate(this.item);
            }
            return item;
        }

        this.itemPreload();
    },

    itemPreload() {
        for (let i = 0; i < itemPreLoadCount; i++) {
            let item = cc.instantiate(this.item);
            this.pool.put(item);
        }
    },

    show(val) {
        let item = this.pool.pop();
        item.getComponent(cc.Label).string = val;
        item.parent = this.layout;
        cc.tween(item)
            .delay(2)
            .to(0.5, { opacity: 0 })
            .call(() => { item.parent = null; item.opacity = 255; this.pool.put(item); })
            .start();
    },
});
