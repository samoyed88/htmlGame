class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
    this.button = null;
    this.gamestart = null;
  }

  preload() {
    this.load.image("button", "assets/img/24.png");
  }

  create() {
    this.button = this.add
      .image(450, 250, "button")
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.gameStart();
      });

    this.gamestart = this.add.text(480, 318, "開始遊戲", {
      fontSize: "25px",
      color: "#ffffff",
    });
    this.button = this.add
      .image(450, 345, "button")
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.gameStart2();
      });

    this.gamestart2 = this.add.text(480, 415, "遊戲說明", {
      fontSize: "25px",
      color: "#ffffff",
    });
  }

  gameStart() {
    this.scene.start("Scene6_1");
  }
  gameStart2() {
    this.scene.start("instructions");
  }

  update() {}
}
