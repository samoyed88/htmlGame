class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
  }
  create() {
    this.add
      .image(0, 0, "background")
      .setScale(0.8) //0.8倍
      .setOrigin(0, 0); //將中心點訂為左上角
  }

  update() {}
}
