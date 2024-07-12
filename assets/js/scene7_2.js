class Scene7_2 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene7_2" });
  }

  preload() {
    this.load.image("background7", "assets/img/background7.png");
    this.load.image("aImg", "assets/img/底.png");
    this.load.image("bImg", "assets/img/底.png");
    this.load.image("small", "assets/img/小於等於.png");
  }

  create() {
    this.add.image(0, 0, "background7").setOrigin(0, 0); //将中心点定为左上角
    this.add.image(500, 110, "small");
    const a = Math.floor(Math.random() * 99 + 1);
    const b = Math.floor(Math.random() * 99 + 1);
    let question = 0;

    do {
      if (a > b) {
        question = Math.floor(Math.random() * (a - (b + 2)) + b + 1);
      } else {
        question = Math.floor(Math.random() * (b - (a + 2)) + a + 1);
      }
    } while (question === a || question === b);

    const aContainer = this.add.container(370, 630);
    const aImage = this.add
      .image(0, 0, "aImg")
      .setScale(0.5)
      .setInteractive({ useHandCursor: true });
    const aText = this.add.text(0, 0, a, {
      fontSize: "150px",
      color: "#000000",
      align: "center"
    }).setOrigin(0.45);

    aContainer.add([aImage, aText]);

    const bContainer = this.add.container(950, 630);
    const bImage = this.add
      .image(0, 0, "bImg")
      .setScale(0.5)
      .setInteractive({ useHandCursor: true });
    const bText = this.add.text(0, 0, b, {
      fontSize: "150px",
      color: "#000000",
      align: "center"
    }).setOrigin(0.45);

    bContainer.add([bImage, bText]);

    this.add.text(900, 60, question, {
      fontSize: "110px",
      color: "#000000",
      fontStyle: "bold"
    });

    aImage.on("pointerup", () => {
      this.next(question, a, b, "a", aImage, aText);
    });

    bImage.on("pointerup", () => {
      this.next(question, a, b, "b", bImage, bText);
    });
  }

  next(question, a, b, chosen, image, text) {
    if (chosen === "a") {
      if (a <= question) {
        this.scene.start("Next7");
      } else {
        image.destroy();
        text.destroy();
      }
    } else if (chosen === "b") {
      if (b <= question) {
        this.scene.start("Next7");
      } else {
        image.destroy();
        text.destroy();
      }
    }
  }
}
