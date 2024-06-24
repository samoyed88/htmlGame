class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("green", "assets/img/green.png");
    this.load.image("yellow", "assets/img/yellow.png");
  }
  create() {
    this.add
      .image(0, 0, "background")
      .setScale(0.6) //0.8倍
      .setOrigin(0, 0); //將中心點訂為左上角
    const greenImage = this.add
      .image(100, 100, "green")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.next();
      });

    const yellowImage = this.add
      .image(500, 100, "yellow")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        yellowImage.destroy();
      });
  }

  next() {
    // 實現進入下一關的邏輯，例如：
    this.scene.start("Scene1_2");
  }

  disappear() {}

  update() {}
}
