class Scene3_2 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene3_2" });
  }
  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("aImg", "assets/img/底.png");
    this.load.image("bImg", "assets/img/底.png");
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0); //将中心点定为左上角

    const a = Math.floor(Math.random() * 99 + 1);
    const b = Math.floor(Math.random() * 99 + 1);
    let question = 0;
    if (a > b) {
      question = Math.floor(Math.random() * (a - b) + b);
    } else {
      question = Math.floor(Math.random() * (b - a) + a);
    }

    const aContainer = this.add.container(190, 360);
    const aImage = this.add
      .image(0, 0, "aImg")
      .setScale(0.2)
      .setInteractive({ useHandCursor: true });
    const aText = this.add.text(-23, -23, a, {
      fontSize: "50px",
      color: "#00BBFF",
    });

    aContainer.add([aImage, aText]);

    const bContainer = this.add.container(500, 360);
    const bImage = this.add
      .image(0, 0, "bImg")
      .setScale(0.2)
      .setInteractive({ useHandCursor: true });
    const bText = this.add.text(-23, -23, b, {
      fontSize: "50px",
      color: "#00BBFF",
    });

    bContainer.add([bImage, bText]);

    this.add.text(950, 355, question, {
      fontSize: "80px",
      color: "#00BBFF",
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
        this.scene.start("Scene4_1");
      } else {
        image.destroy();
        text.destroy();
      }
    } else if (chosen === "b") {
      if (b <= question) {
        this.scene.start("Scene4_1");
      } else {
        image.destroy();
        text.destroy();
      }
    }
  }
}
