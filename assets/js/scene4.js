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
    this.add.image(0, 0, "background4").setOrigin(0, 0); // 将中心点定为左上角

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

    const columns = 4; // 每行排列的图像数量
    const rows = 2; // 总行数
    const imageWidth = 150; // 图像宽度
    const imageHeight = 150; // 图像高度
    const offsetX = 100; // 第一列右移的距离
    const offsetY = 200; // 第一行下移的距离
    const spacingX = 150; // 图片之间的水平间距
    const spacingY = 150; // 图片之间的垂直间距

    // 显示图像
    items.forEach((item, index) => {
      const x = offsetX + (index % columns) * (imageWidth + spacingX);
      const y = offsetY + 150 + Math.floor(index / columns) * (imageHeight + spacingY);
      const image = this.add
        .image(x, y, item.key)
        .setOrigin(0, 0)
        .setScale(0.25)
        .setInteractive({ useHandCursor: true });

      image.pair = item.pair; // 存储配对信息

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
      if (this.selectedImage.pair === image.texture.key) {
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
            // 所有配对完成，显示恭喜界面
            this.showCongratulations();
          }
        });
      } else {
        // 配对失败
        this.selectedImage.setAlpha(1);
        this.selectedImage = null;
      }
    }
  }

  showCongratulations() {
    // 创建覆盖层
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.7);
    overlay.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);

    // 显示恭喜信息
    const congratsText = this.add
      .text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 - 50, "恭喜通過這一關", {
        fontSize: "40px", // 增大字体
        color: "#ffffff",
        padding: { left: 20, right: 20, top: 10, bottom: 10 }, // 增加填充
      })
      .setOrigin(0.5, 0.5);

    // 创建进入下一关的按钮
    const nextButton = this.add
      .text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 50, "進入下一關", {
        fontSize: "30px",
        color: "#ffffff",
        backgroundColor: "#00bfff",
        padding: { left: 20, right: 20, top: 10, bottom: 10 },
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });

    nextButton.on("pointerup", () => {
      this.scene.start("next4");
    });
  }
}
