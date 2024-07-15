class Scene3_3 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene3_3" });
  }

  preload() {
    this.load.image("background3", "assets/img/background3.png");
    this.load.image("rabbit", "assets/img/兔子.png");
    this.load.image("monkey", "assets/img/猴子.png");
    this.load.image("giraffe", "assets/img/長頸鹿.png");
    this.load.image("panda", "assets/img/熊貓.png");
    this.load.image("b-rabbit", "assets/img/兔子_黑圖.png");
  }

  create() {
    this.add.image(0, 0, "background3").setOrigin(0, 0);

    let correctAnswer = "rabbit";

    let positions = [
      { x: 450, y: 420 },
      { x: 875, y: 420 },
      { x: 450, y: 820 },
      { x: 875, y: 820 },
    ];

    this.shuffleArray(positions);

    let options = [
      { key: "rabbit", x: positions[0].x, y: positions[0].y },
      { key: "monkey", x: positions[1].x, y: positions[1].y },
      { key: "giraffe", x: positions[2].x, y: positions[2].y },
      { key: "panda", x: positions[3].x, y: positions[3].y },
    ];

    this.add.image(650, 125, "b-rabbit").setScale(0.25);

    let optionImages = [];

    options.forEach((option) => {
      let optionImage = this.add
        .image(option.x, option.y, option.key)
        .setScale(0.35)
        .setInteractive();
      optionImage.on("pointerdown", () => {
        this.checkAnswer(option.key);
      });
      optionImages.push(optionImage);
    });

    this.checkAnswer = function (selectedKey) {
      if (selectedKey === correctAnswer) {
        this.scene.start("Next3");
      } else {
        let wrongOption = optionImages.find(
          (img) => img.texture.key === selectedKey
        );
        if (wrongOption) {
          wrongOption.destroy();
        }
      }
    };
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
