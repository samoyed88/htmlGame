class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("apple", "assets/img/apple.png");
    this.load.image("banana", "assets/img/banana.png");
    this.load.image("green", "assets/img/green.png");
    this.load.image("yellow", "assets/img/yellow.png");
  }
  create() {
    this.add
      .image(0, 0, "background")
      .setScale(0.8) //0.8倍
      .setOrigin(0, 0); //將中心點訂為左上角
    this.add
      .image(100, 250, "green")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.3倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.next();
      });
    this.add
      .image(500, 100, "yellow")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.3倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.disappear();
      });
  }

  next() {
    this.scene.start("Scene1_2");
  }

  disappear() {}

  update() {}
}
