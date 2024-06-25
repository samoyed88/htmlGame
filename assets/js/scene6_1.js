class Scene6_1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene6_1" });
    this.selectedImage = null;
    this.pairsLeft = 0; // 初始化剩余配对数
  }

  preload() {
    this.load.image("background", "assets/img/background.png");

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
    this.add
      .image(0, 0, "background")
      .setScale(0.6) // 0.6倍
      .setOrigin(0, 0); // 将中心点定为左上角

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

    Phaser.Utils.Array.Shuffle(items); // 打乱顺序

    this.pairsLeft = items.length / 2; // 初始化剩余配对数

    // 显示图像
    items.forEach((item, index) => {
      const x = 100 + (index % 4) * 200; // 修改：每行排列4张图像
      const y = 100 + Math.floor(index / 4) * 200; // 修改：每行排列4张图像
      const image = this.add.image(x, y, item.key)
        .setOrigin(0, 0)
        .setScale(0.2)
        .setInteractive({ useHandCursor: true });

      image.data = item; // 存储数据以便后续使用

      image.on("pointerup", () => this.handleImageClick(image));
    });
  }

  handleImageClick(image) {
    if (!this.selectedImage) {
      // 选择第一个图像
      this.selectedImage = image;
      image.setAlpha(0.5); // 将图像半透明以表示选择状态
    } else if (this.selectedImage === image) {
      // 再次点击同一图像，取消选择
      this.selectedImage.setAlpha(1);
      this.selectedImage = null;
    } else {
      // 选择第二个图像并进行配对检查
      if (this.selectedImage.data.pair === image.data.key) {
        // 配对成功，隐藏两张图像
        const firstImage = this.selectedImage;
        const secondImage = image;
        this.selectedImage = null;

        // 使用 Phaser 的定时器来稍后隐藏图像，使其显示短暂的配对成功状态
        this.time.delayedCall(300, () => {
          firstImage.setVisible(false);
          secondImage.setVisible(false);

          this.pairsLeft--; // 减少剩余配对数
          if (this.pairsLeft === 0) {
            // 所有配对完成，进入下一关
            this.nextScene();
          }
        });
      } else {
        // 配对失败
        this.selectedImage.setAlpha(1);
        this.selectedImage = null;
      }
    }
  }

  nextScene() {
    this.scene.start("Scene7_1"); // 切换到下一关场景
  }
}
