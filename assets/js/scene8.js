class Scene8 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene8" });
  }

  preload() {
    this.load.image("background", "assets/img/background8.png");
    this.load.image("aImg", "assets/img/底.png");
    this.load.image("bImg", "assets/img/底.png");
    this.load.image("cImg", "assets/img/底.png");
    this.load.image("dImg", "assets/img/底.png");
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);

    const num1 = Math.floor(Math.random() * 49 + 50);
    const num2 = Math.floor(Math.random() * 50 + 1);
    const question = num1 + "-" + num2 + "=";
    const correctAnswer = num1 - num2;
    const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) + 1;
    const wrongAnswer2 = correctAnswer + Math.floor(Math.random() * 10) + 1;
    const wrongAnswer3 = correctAnswer + Math.floor(Math.random() * 10) + 1;
    const wrongAnswer4 = correctAnswer + Math.floor(Math.random() * 10) + 1;

    let var1 = false;
    let var2 = false;
    let var3 = false;
    let var4 = false;

    const randomIndex = Math.floor(Math.random() * 4);

    switch (randomIndex) {
      case 0:
        var1 = true;
        break;
      case 1:
        var2 = true;
        break;
      case 2:
        var3 = true;
        break;
      case 3:
        var4 = true;
        break;
      default:
        break;
    }

    const aAnswer = var1 ? correctAnswer : wrongAnswer;
    const aContainer = this.add.container(370, 400);
    const aImage = this.add.image(0, 0, "aImg").setScale(0.35).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
    const aText = this.add.text(0, 0, aAnswer, {
      fontSize: "90px",
      color: "#000000",
    }).setOrigin(0.5, 0.5);
    aContainer.add([aImage, aText]);

    const bAnswer = var2 ? correctAnswer : wrongAnswer2;
    const bContainer = this.add.container(1000, 400);
    const bImage = this.add.image(0, 0, "bImg").setScale(0.35).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
    const bText = this.add.text(0, 0, bAnswer, {
      fontSize: "90px",
      color: "#000000",
    }).setOrigin(0.5, 0.5);
    bContainer.add([bImage, bText]);

    const cAnswer = var3 ? correctAnswer : wrongAnswer3;
    const cContainer = this.add.container(370, 800);
    const cImage = this.add.image(0, 0, "cImg").setScale(0.35).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
    const cText = this.add.text(0, 0, cAnswer, {
      fontSize: "90px",
      color: "#000000",
    }).setOrigin(0.5, 0.5);
    cContainer.add([cImage, cText]);

    const dAnswer = var4 ? correctAnswer : wrongAnswer4;
    const dContainer = this.add.container(1000, 800);
    const dImage = this.add.image(0, 0, "dImg").setScale(0.35).setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true });
    const dText = this.add.text(0, 0, dAnswer, {
      fontSize: "90px",
      color: "#000000",
    }).setOrigin(0.5, 0.5);
    dContainer.add([dImage, dText]);

    this.add.text(492, 85, question, {
      fontSize: "100px",
      color: "#000000",
    });

    aImage.on("pointerup", () => {
      this.next(var1, "a", aImage, aText);
    });

    bImage.on("pointerup", () => {
      this.next(var2, "b", bImage, bText);
    });

    cImage.on("pointerup", () => {
      this.next(var3, "c", cImage, cText);
    });

    dImage.on("pointerup", () => {
      this.next(var4, "d", dImage, dText);
    });
  }

  next(var0, chosen, image, text) {
    if (var0) {
      this.scene.start("Next8");
    } else {
      image.destroy();
      text.destroy();
    }
  }
}
