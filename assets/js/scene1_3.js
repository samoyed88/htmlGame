class Scene1_3 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1_3" });
  }
  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("green", "assets/img/green.png");
    this.load.image("yellow", "assets/img/yellow.png");
    this.load.image("red", "assets/img/red.png");
    this.load.image("purple", "assets/img/purple.png");
  }
  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0); //將中心點訂為左上角

    const greenImage = this.add
      .image(70, 50, "green")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        greenImage.destroy();
      });

    const yellowImage = this.add
      .image(470, 50, "yellow")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        yellowImage.destroy();
      });

    const redImage = this.add
      .image(70, 300, "red")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        redImage.destroy();
      });

    const purpleImage = this.add
      .image(470, 300, "purple")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.next();
      });
  }
  next() {
    // 實現進入下一關的邏輯，例如：
    this.scene.start("Scene2_1");
  }

  update() {}
}
