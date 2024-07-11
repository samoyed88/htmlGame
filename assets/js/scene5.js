class Scene5 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene5" });
  }

  preload() {
    this.load.image("background5", "assets/img/background5.png");
    this.load.image("cardBack", "assets/img/底.png");
    this.load.image("cantaloupe", "assets/img/哈密瓜.png");
    this.load.image("strawberry", "assets/img/草莓.png");
    this.load.image("grape", "assets/img/葡萄.png");
    this.load.image("apple", "assets/img/蘋果.png");
  }

  create() {
    this.add.image(0, 0, "background5").setOrigin(0, 0);

    const fruitKeys = ["cantaloupe", "strawberry", "grape", "apple"];
    this.cards = [];
    this.selectedCards = [];

    // Create pairs of cards
    for (let key of fruitKeys) {
      this.cards.push({ key: key, matched: false });
      this.cards.push({ key: key, matched: false });
    }

    // Shuffle the cards
    Phaser.Utils.Array.Shuffle(this.cards);

    const columns = 4; // 每行排列的卡片数量
    const imageWidth = 150; // 卡片宽度
    const imageHeight = 150; // 卡片高度
    const offsetX = 220 // 第一列右移的距离
    const offsetY = 325; // 第一行下移的距离
    const spacingX = 150; // 卡片之间的水平间距
    const spacingY = 150; // 卡片之间的垂直间距

    // Display the cards with adjusted spacing
    for (let i = 0; i < this.cards.length; i++) {
      let card = this.cards[i];
      let x = offsetX + (i % columns) * (imageWidth + spacingX); // 设置X坐标
      let y = offsetY + 150 + Math.floor(i / columns) * (imageHeight + spacingY); // 设置Y坐标

      card.sprite = this.add
        .sprite(x, y, "cardBack")
        .setScale(0.25)
        .setInteractive();
      card.isFlipped = false;

      // Add click event to flip the card
      card.sprite.on("pointerup", () => {
        this.flipCard(card);
      });
    }
  }

  flipCard(card) {
    if (this.selectedCards.length < 2 && !card.isFlipped) {
      card.sprite.setTexture(card.key).setScale(0.25);
      card.isFlipped = true;
      this.selectedCards.push(card);

      if (this.selectedCards.length === 2) {
        this.checkForMatch();
      }
    }
  }

  checkForMatch() {
    let [firstCard, secondCard] = this.selectedCards;
    if (firstCard.key === secondCard.key) {
      firstCard.matched = true;
      secondCard.matched = true;
      this.selectedCards = [];
      this.checkForWin();
    } else {
      this.time.delayedCall(1000, () => {
        firstCard.sprite.setTexture("cardBack").setScale(0.25);
        secondCard.sprite.setTexture("cardBack").setScale(0.25);
        firstCard.isFlipped = false;
        secondCard.isFlipped = false;
        this.selectedCards = [];
      });
    }
  }

  checkForWin() {
    // Check if all cards are matched
    const allMatched = this.cards.every((card) => card.matched);
    if (allMatched) {
      // Switch to the new scene
      this.time.delayedCall(1000, () => {
        this.scene.start("next5");
      });
    }
  }
}
