const CardWidthCount = 3;
const CardHeightCount = 3;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        this.node.onenter = this.onenter.bind(this);

        this.model = {
            middleScale: 490 / 669,
            cardScale: 94 / 117,
            drawing: false,
            opendIdx: [],

            // status 0未领取 1已领取
            rewards: [
                { '编号': 10000, '状态': 0, },
                { '编号': 10001, '状态': 0, },
                { '编号': 10002, '状态': 0, },
                { '编号': 10003, '状态': 0, },
                { '编号': 20000, '状态': 1, },
                { '编号': 10000, '状态': 1, },
                { '编号': 10001, '状态': 1, },
                { '编号': 10002, '状态': 0, },
                { '编号': 10003, '状态': 0, },
                { '编号': 20000, '状态': 0, },
                { '编号': 10000, '状态': 0, },
                { '编号': 10001, '状态': 0, },
                { '编号': 10002, '状态': 1, },
                { '编号': 10003, '状态': 1, },
                { '编号': 20000, '状态': 1, },
                { '编号': 10000, '状态': 1, },
                { '编号': 10001, '状态': 0, },
                { '编号': 10002, '状态': 0, },
                { '编号': 10003, '状态': 0, },
                { '编号': 20000, '状态': 0, },
            ],
        };

        // middle
        this.middle = this.node.PathChild('middle');
        this.middle.width = WinSize.width - 50;
        this.middle.height = this.middle.width / this.model.middleScale;
        this.cardsRoot = this.middle.PathChild('cardsRoot');
        this.cardItem = this.cardsRoot.PathChild('cardItem');
        this.cardsRoot.removeAllChildren();
        this.cardItem.width = this.cardsRoot.width / CardWidthCount;
        this.cardItem.height = this.cardItem.width / this.model.cardScale;
        // bottom
        this.rewardsRoot = this.node.PathChild('bottom/scrollView/view/content');
        this.rewardItem = this.node.PathChild('bottom/scrollView/view/content/rewardItem');
        this.rewardsRoot.removeAllChildren();

        // 创建card
        this.createCards();
        // 创建reward
        this.createRewards();
    },

    onenter(args) {
        AudioMgr.playMusic('bgm_treasure');

        this.updateTop();
        this.setupCards();
        this.setupRewards();
    },

    onleave() {
        AudioMgr.playMusic('bgm_home');
    },

    createCards() {
        this.cardsRoot.removeAllChildren();
        for (let i = 0; i < CardWidthCount * CardHeightCount; i++) {
            let card = cc.instantiate(this.cardItem);
            card.idx = i;
            card.parent = this.cardsRoot;
        }
    },

    createRewards() {
        this.rewardsRoot.removeAllChildren();
        for (let i = 0; i < CardWidthCount * CardHeightCount; i++) {
            let reward = cc.instantiate(this.rewardItem);
            reward.parent = this.rewardsRoot;
        }
    },

    updateTop() {
        this.node.PathChild('top/coin/val').color = cc.color(Consume['金币'].color);
        this.node.PathChild('top/coin/val', cc.Label).string = Player['金币'];
        this.node.PathChild('top/diam/val').color = cc.color(Consume['钻石'].color);
        this.node.PathChild('top/diam/val', cc.Label).string = Player['钻石'];
    },

    setupCards() {
        for (let i = 0; i < this.cardsRoot.children.length; i++) {
            let card = this.cardsRoot.children[i];
            card.opacity = 0;
            card.PathChild('bg', 'MultiFrame').setFrame(0);
            card.active = true;
            cc.tween(card)
                .delay(0.2 + i * 0.1)
                .to(0.1, { opacity: 255 })
                .start();
        }
    },

    setupRewards() {
        for (let i = 0; i < this.rewardsRoot.children.length; i++) {
            let reward = this.rewardsRoot.children[i];
            SetSpriteFrame(`ui/Prop/${this.model.rewards[i]['编号']}`, reward.PathChild('val', cc.Sprite));
            reward.PathChild('gou').active = this.model.rewards[i]['状态'] == 1;
        }
    },

    btnResetCards() {
        if (this.model.drawing) {
            return;
        }

        this.model.opendIdx = [];

        this.setupCards();
    },

    btnCard(e) {
        let idx = e.target.idx;
        if (this.model.drawing || this.model.opendIdx.indexOf(idx) != -1) {
            return;
        }

        this.model.drawing = true;
        this.model.opendIdx.push(idx);

        cc.tween(this.cardsRoot.children[idx])
            .repeat(3, cc.tween()
                .to(0.15, { scaleX: 0 })
                .to(0.15, { scaleX: 1 })
            )
            .delay(0.1)
            .call(() => { this.cardsRoot.children[idx].PathChild('bg', 'MultiFrame').setFrame(1); this.model.drawing = false; })
            .start();
    },

    btnClose() {
        UiMgr.close(this.node.name);
    },
});