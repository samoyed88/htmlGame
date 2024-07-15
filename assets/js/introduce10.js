class Introduce10 extends Phaser.Scene {
  constructor() {
    super({ key: "Introduce10" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("ins10", "assets/img/ins10-10.png");
    this.load.image("next", "assets/img/next.png");
  }

  create() {
    this.add.image(0, 0, "ins10").setOrigin(0, 0);
    this.button = this.add
      .image(900, 950, "next")
      .setScale(0.1)
      .setOrigin(0, 0)
      .setInteractive();

    this.button.on("pointerup", () => {
      this.scene.start("Scene10");
    });
  }
}
