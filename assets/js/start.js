class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
  }

  preload() {
    this.load.image("illustrate", "assets/img/illustrate.png");
    this.load.image("start", "assets/img/start.png");
    this.load.image("back-start", "assets/img/background-start.png");
  }

  create() {
    this.add.image(0, 0, "back-start").setOrigin(0, 0);
    this.add
      .image(950, 650, "start")
      .setScale(0.8) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.gameStart();
      });

    this.illustrate = this.add
      .image(950, 750, "illustrate")
      .setScale(0.65)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.gameStart2();
      });
  }

  gameStart() {
    this.scene.start("Preface");
  }
  gameStart2() {
    this.scene.start("instructions");
  }

  update() {}
}
