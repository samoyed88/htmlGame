class Preface extends Phaser.Scene {
  constructor() {
    super({ key: "Preface" });
    this.button = null;
    this.background = null;
  }

  preload() {
    this.load.image("pre_background", "assets/img/pre_background.png");
    this.load.image("next", "assets/img/下一步.png");
  }

  create() {
    this.background = this.add.image(0, 0, "pre_background").setOrigin(0, 0);

    this.button = this.add
      .image(900, 850, "next")
      .setScale(0.47)
      .setOrigin(0, 0)
      .setInteractive();

    this.button.on("pointerup", () => {
      this.background.destroy();
      this.scene.start("Map");
    });
  }
}
