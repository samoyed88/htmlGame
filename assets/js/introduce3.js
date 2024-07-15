class Introduce3 extends Phaser.Scene {
  constructor() {
    super({ key: "Introduce3" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("ins3", "assets/img/ins3-3.png");
    this.load.image("next", "assets/img/next.png");
  }

  create() {
    this.add.image(0, 0, "ins3").setOrigin(0, 0);
    this.button = this.add
      .image(900, 900, "next")
      .setScale(0.1)
      .setOrigin(0, 0)
      .setInteractive();

    this.button.on("pointerup", () => {
      let randomScene = Phaser.Math.Between(1, 3);
      let sceneKey = `Scene3_${randomScene}`;
      this.scene.start(sceneKey);
    });
  }
}
