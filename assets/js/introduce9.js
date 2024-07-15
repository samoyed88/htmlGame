class Introduce9 extends Phaser.Scene {
  constructor() {
    super({ key: "Introduce9" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("ins9", "assets/img/ins9-9.png");
    this.load.image("next", "assets/img/next.png");
  }

  create() {
    this.add.image(0, 0, "ins9").setOrigin(0, 0);
    this.button = this.add
      .image(900, 900, "next")
      .setScale(0.1)
      .setOrigin(0, 0)
      .setInteractive();

    this.button.on("pointerup", () => {
      this.scene.start("Scene9");
    });
  }
}
