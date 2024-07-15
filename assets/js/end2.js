class End2 extends Phaser.Scene {
  constructor() {
    super({ key: "End2" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("end2", "assets/img/end2.png");
    this.load.image("back", "assets/img/返回鍵.png");
  }

  create() {
    this.add.image(0, 0, "end2").setOrigin(0, 0);
    this.button = this.add
      .image(500, 725, "back")
      .setScale(0.5)
      .setOrigin(0, 0)
      .setInteractive();

    this.button.on("pointerup", () => {
      this.scene.start("Start");
    });
  }
}
