class Scene4 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene4" });
    this.selectedImage = null;
    this.pairsLeft = 0; // 初始化剩余配对数
  }

  preload() {
    this.load.image("background4", "assets/img/background4.png");

    this.load.image("cat", "assets/img/貓咪.png");
    this.load.image("fish", "assets/img/魚.png");

    this.load.image("monkey", "assets/img/猴子.png");
    this.load.image("banana", "assets/img/香蕉.png");

    this.load.image("panda", "assets/img/熊貓.png");
    this.load.image("bamboo", "assets/img/竹子.png");

    this.load.image("rabbit", "assets/img/兔子.png");
    this.load.image("carrot", "assets/img/紅羅蔔.png");
  }

  create() {
    this.add.image(0, 0, "background4").setOrigin(0, 0);

    const items = [
      { key: "cat", pair: "fish" },
      { key: "fish", pair: "cat" },
      { key: "monkey", pair: "banana" },
      { key: "banana", pair: "monkey" },
      { key: "panda", pair: "bamboo" },
      { key: "bamboo", pair: "panda" },
      { key: "rabbit", pair: "carrot" },
      { key: "carrot", pair: "rabbit" },
    ];

    Phaser.Utils.Array.Shuffle(items);

    this.pairsLeft = items.length / 2;

    const columns = 4;
    const rows = 2;
    const imageWidth = 150;
    const imageHeight = 150;
    const offsetX = 100;
    const offsetY = 200;
    const spacingX = 150;
    const spacingY = 150;

    // 显示图像
    items.forEach((item, index) => {
      const x = offsetX + (index % columns) * (imageWidth + spacingX);
      const y =
        offsetY + 150 + Math.floor(index / columns) * (imageHeight + spacingY);
      const image = this.add
        .image(x, y, item.key)
        .setOrigin(0, 0)
        .setScale(0.25)
        .setInteractive({ useHandCursor: true });

      image.pair = item.pair;

      image.on("pointerup", () => this.handleImageClick(image));
    });
  }

  handleImageClick(image) {
    if (!this.selectedImage) {
      this.selectedImage = image;
      image.setAlpha(0.5);
    } else if (this.selectedImage === image) {
      this.selectedImage.setAlpha(1);
      this.selectedImage = null;
    } else {
      if (this.selectedImage.pair === image.texture.key) {
        const firstImage = this.selectedImage;
        const secondImage = image;
        this.selectedImage = null;

        this.time.delayedCall(300, () => {
          firstImage.setVisible(false);
          secondImage.setVisible(false);

          this.pairsLeft--;
          if (this.pairsLeft === 0) {
            this.scene.start("Next4");
          }
        });
      } else {
        this.selectedImage.setAlpha(1);
        this.selectedImage = null;
      }
    }
  }
}
