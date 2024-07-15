class End1 extends Phaser.Scene {
  constructor() {
    super({ key: "End1" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("end1", "assets/img/end1.png");
    this.load.image("next", "assets/img/next.png");
  }

  create() {
    this.add.image(0, 0, "end1").setOrigin(0, 0);
    this.button = this.add
      .image(1600, 900, "next")
      .setScale(0.1)
      .setOrigin(0, 0)
      .setInteractive();

    this.button.on("pointerup", () => {
      this.scene.start("End2");
    });
  }
}
