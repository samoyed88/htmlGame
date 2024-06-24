class Scene4_1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene4_1" });
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

    const num1 = Math.floor(Math.random() * 99 + 1);
    const num2 = Math.floor(Math.random() * 99 + 1);
    const question = num1 + "+" + num2 + "=";
    const correctAnswer = num1 + num2;
    const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) + 1; // 随机生成一个错误答案

    // 确定哪个位置显示正确答案
    const isCorrectAnswerOnLeft = Math.random() < 0.5;

    // 创建左侧方块
    const leftAnswer = isCorrectAnswerOnLeft ? correctAnswer : wrongAnswer;
    const leftContainer = this.add.container(150, 200);
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
    const rightContainer = this.add.container(500, 200);
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
      this.next(
        question,
        correctAnswer,
        wrongAnswer,
        "correctAnswer",
        leftImage,
        leftText
      );
    });

    rightImage.on("pointerup", () => {
      this.next(
        question,
        correctAnswer,
        wrongAnswer,
        "wrongAnswer",
        rightImage,
        leftText
      );
    });
  }
  next(question, correctAnswer, wrongAnswer, chosen, image, text) {
    if (chosen === "correctAnswer") {
      if (correctAnswer == question) {
        this.scene.start("Scene4_2");
      } else {
        image.destroy();
        text.destroy();
      }
    } else if (chosen === "wrongAnswer") {
      if (wrongAnswer != question) {
        this.scene.start("Scene4_2");
      } else {
        image.destroy();
        text.destroy();
      }
    }
  }
}
