class Map extends Phaser.Scene {
  constructor() {
    super({ key: "Map" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("map", "assets/img/map.png");
    this.load.image("next", "assets/img/下一步.png");
  }

  create() {
    this.add.image(0, 0, "map").setOrigin(0, 0);
    this.button = this.add
      .image(1700, 925, "next")
      .setScale(0.12)
      .setOrigin(0, 0)
      .setInteractive();

    this.button.on("pointerup", () => {
      this.scene.start("Introduce1");
    });
  }
}
