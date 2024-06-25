class Scene1_2 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1_2" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("green", "assets/img/green.png");
    this.load.image("yellow", "assets/img/yellow.png");
    this.load.image("red", "assets/img/red.png");
  }
  create() {
    this.add
      .image(0, 0, "background")
      .setScale(0.6) //0.6倍
      .setOrigin(0, 0); //將中心點訂為左上角

    const greenImage = this.add
      .image(15, 100, "green")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        greenImage.destroy();
      });

    const yellowImage = this.add
      .image(490, 100, "yellow")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.next();
      });

    const redImage = this.add
      .image(257, 300, "red")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.35) //0.35倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        redImage.destroy();
      });
  }
  next() {
    // 實現進入下一關的邏輯，例如：
    this.scene.start("Scene1_3");
  }

  update() {}
}
