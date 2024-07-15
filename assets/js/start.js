class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
  }

  preload() {
    this.load.image("start", "assets/img/start.png");
    this.load.image("back-start", "assets/img/background_start.png");
  }

  create() {
    this.add.image(0, 0, "back-start").setOrigin(0, 0);
    this.add
      .image(950, 750, "start")
      .setScale(0.8)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.startGame();
      });
  }

  startGame() {
    postData(
      null,
      null,
      "6b8e64829e4c9e24745cefe4fcff5d7e3d9edd421055982d48af18753c0837e6",
      null,
      null
    );
    this.scene.start("Book");
  }
}
