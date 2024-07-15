class Book extends Phaser.Scene {
  constructor() {
    super({ key: "Book" });
    this.button = null;
    this.start = null;
  }
  preload() {
    this.load.image("preface", "assets/img/preface.png");
    this.load.image("next", "assets/img/next.png");
  }
  create() {
    this.add.image(0, 0, "preface").setOrigin(0, 0);
    this.button = this.add
      .image(900, 950, "next")
      .setScale(0.1)
      .setOrigin(0, 0)
      .setInteractive();

    this.button.on("pointerup", () => {
      this.scene.start("Instructions");
    });
  }
}
