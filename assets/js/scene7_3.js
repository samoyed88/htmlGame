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
    this.add.image(0, 0, "background").setOrigin(0, 0); // 将中心点定为左上角

    let correctAnswer = "rabbit"; // 正確答案的 key

    // 定義四個位置
    let positions = [
      { x: 325, y: 250 },
      { x: 525, y: 250 },
      { x: 325, y: 450 },
      { x: 525, y: 450 },
    ];

    // 打亂位置數組
    this.shuffleArray(positions);

    // 白色區域顯示四張圖片，並分配隨機位置
    let options = [
      { key: "cat", x: positions[0].x, y: positions[0].y },
      { key: "monkey", x: positions[1].x, y: positions[1].y },
      { key: "panda", x: positions[2].x, y: positions[2].y },
      { key: "rabbit", x: positions[3].x, y: positions[3].y },
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

  // 打亂數組的函數
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
