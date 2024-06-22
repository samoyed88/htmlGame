class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
  }
  create() {
    this.add.image(768, 432, "background").setScale(0.8);
  }

  update() {}
}
