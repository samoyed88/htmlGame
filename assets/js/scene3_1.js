class Scene3_1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene3_1" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
  }
  create() {
    this.add
      .image(0, 0, "background")
      .setScale(0.6) //0.8倍
      .setOrigin(0, 0); //將中心點訂為左上角

    const question = Math.random() * 99 + 1;
    const a = Math.random() * 99 + 1;
    const b = Math.random() * 99 + 1;
  }
}
