class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
  }

  preload() {
    this.load.image("illustrate", "assets/img/illustrate.png");
    this.load.image("start", "assets/img/start.png");
  }

  create() {
    this.add
      .image(530, 278, "start")
      .setScale(0.47) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.gameStart();
      });

    this.illustrate = this.add
      .image(530, 385, "illustrate")
      .setScale(0.38)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.gameStart2();
      });
  }

  gameStart() {
    this.scene.start("Scene7_1");
  }
  gameStart2() {
    this.scene.start("instructions");
  }

  update() {}
}
