cc.Class({
    extends: cc.Component,

    properties: {
        minScale: 0.9,
        maxScale: 1.1,
    },

    onLoad() {
        cc.tween(this.node)
            .repeatForever(cc.tween()
                .to(0.1, { scale: this.maxScale })
                .to(0.1, { scale: 1 })
                .to(0.1, { scale: this.minScale })
                .to(0.1, { scale: 1 })
                .to(0.1, { scale: this.maxScale })
                .to(0.1, { scale: 1 })
                .to(0.1, { scale: this.minScale })
                .to(0.1, { scale: 1 })
                .delay(1)
            )
            .start();
    },
});
