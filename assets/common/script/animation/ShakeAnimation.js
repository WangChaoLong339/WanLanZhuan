cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        cc.tween(this.node)
            .repeatForever(cc.tween()
                .to(0.02, { position: cc.v2(0.00, 10.00), })
                .to(0.02, { position: cc.v2(-7.07, -7.07), })
                .to(0.02, { position: cc.v2(10.00, -0.00), })
                .to(0.02, { position: cc.v2(-7.07, 7.07), })
                .to(0.02, { position: cc.v2(-0.00, -10.00), })
                .to(0.02, { position: cc.v2(7.07, 7.07), })
                .to(0.02, { position: cc.v2(-10.00, 0.00), })
                .to(0.02, { position: cc.v2(7.07, -7.07), })
                .to(0.02, { position: cc.v2(0, 0), })
                .delay(2)
            )
            .start();
    },
});










