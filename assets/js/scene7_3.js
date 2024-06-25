class Scene7_3 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene7_3" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("rabbit", "assets/img/兔子.png");
    this.load.image("monkey", "assets/img/猴子.png");
    this.load.image("giraffe", "assets/img/長頸鹿.png");
    this.load.image("panda", "assets/img/熊貓.png");
    this.load.image("b-rabbit", "assets/img/兔子_黑圖.png");
  }

  create() {
    this.add
      .image(0, 0, "background")
      .setScale(0.6) // 0.6倍
      .setOrigin(0, 0); // 将中心点定为左上角

    let correctAnswer = "rabbit"; // 正確答案的 key

    // 白色區域顯示四張圖片
    let options = [
      { key: "rabbit", x: 200, y: 250 },
      { key: "monkey", x: 400, y: 250 },
      { key: "panda", x: 200, y: 450 },
      { key: "giraffe", x: 400, y: 450 },
    ];
    this.add.image(1000, 400, "b-rabbit").setScale(0.2); // 題目圖片

    let optionImages = [];

    options.forEach((option) => {
      let optionImage = this.add
        .image(option.x, option.y, option.key)
        .setScale(0.2)
        .setInteractive();
      optionImage.on("pointerdown", () => {
        this.checkAnswer(option.key);
      });
      optionImages.push(optionImage); // 将创建的图片对象添加到数组中
    });

    this.checkAnswer = function (selectedKey) {
      if (selectedKey === correctAnswer) {
        this.scene.start("Scene8_1"); // 如果答案正确，进入下一个场景
      } else {
        // 如果答案错误，找到错误的选项图片并销毁
        let wrongOption = optionImages.find(
          (img) => img.texture.key === selectedKey
        );
        if (wrongOption) {
          wrongOption.destroy();
        }
      }
    };
  }
}
