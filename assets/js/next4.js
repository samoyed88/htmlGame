class Next4 extends Phaser.Scene {
  constructor() {
    super({ key: "Next4" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("next4", "assets/img/next4.png");
    this.load.image("next0", "assets/img/next0.png");
  }

  create() {
    this.add.image(0, 0, "next4").setOrigin(0, 0);
    this.button = this.add
      .image(1400, 800, "next0")
      .setScale(0.3)
      .setOrigin(0, 0)
      .setInteractive();

    this.button.on("pointerup", () => {
      this.scene.start("Introduce5");
    });
  }
}
