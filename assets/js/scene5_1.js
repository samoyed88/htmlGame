class Scene5_1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene5_1" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("aImg", "assets/img/底.png");
    this.load.image("bImg", "assets/img/底.png");
  }

  create() {
    this.add
      .image(0, 0, "background")
      .setScale(0.6) // 0.6倍
      .setOrigin(0, 0); // 将中心点定为左上角

    const num1 = Math.floor(Math.random() * 49 + 50);
    const num2 = Math.floor(Math.random() * 50 + 1);
    const question = num1 + "-" + num2 + "=";
    const correctAnswer = num1 - num2;
    const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) + 1; // 随机生成一个错误答案

    // 确定哪个位置显示正确答案
    const isCorrectAnswerOnLeft = Math.random() < 0.5;

    // 创建左侧方块
    const leftAnswer = isCorrectAnswerOnLeft ? correctAnswer : wrongAnswer;
    const leftContainer = this.add.container(190, 360);
    const leftImage = this.add
      .image(0, 0, "aImg")
      .setScale(0.2)
      .setInteractive({ useHandCursor: true });
    const leftText = this.add.text(-23, -23, leftAnswer, {
      fontSize: "50px",
      color: "#00BBFF",
    });

    leftContainer.add([leftImage, leftText]);

    // 创建右侧方块
    const rightAnswer = isCorrectAnswerOnLeft ? wrongAnswer : correctAnswer;
    const rightContainer = this.add.container(500, 360);
    const rightImage = this.add
      .image(0, 0, "bImg")
      .setScale(0.2)
      .setInteractive({ useHandCursor: true });
    const rightText = this.add.text(-23, -23, rightAnswer, {
      fontSize: "50px",
      color: "#00BBFF",
    });

    rightContainer.add([rightImage, rightText]);

    this.add.text(900, 325, question, {
      fontSize: "50px",
      color: "#00BBFF",
    });

    leftImage.on("pointerup", () => {
      this.next(isCorrectAnswerOnLeft, "left", leftImage, leftText);
    });

    rightImage.on("pointerup", () => {
      this.next(isCorrectAnswerOnLeft, "right", rightImage, rightText);
    });
  }
  next(isCorrectAnswerOnLeft, chosen, image, text) {
    if (chosen === "left") {
      if (isCorrectAnswerOnLeft) {
        this.scene.start("Scene5_2");
      } else {
        image.destroy();
        text.destroy();
      }
    } else if (chosen === "right") {
      if (isCorrectAnswerOnLeft) {
        image.destroy();
        text.destroy();
      } else {
        this.scene.start("Scene5_2");
      }
    }
  }
}
