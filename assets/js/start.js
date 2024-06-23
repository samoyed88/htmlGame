class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
    this.button = null;
  }

  preload() {
    this.load.image("button", "assets/img/24.png");
  }
  create() {
    this.button = this.add
      .image(450, 250, "button")
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.gameStart();
      });
  }
  gameStart() {
    this.scene.start("Scene1");
  }

  update() {}
}
