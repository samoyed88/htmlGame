class Scene2_1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene2_1" });
    this.question = null;
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("cantaloupe", "assets/img/哈密瓜.png");
    this.load.image("strawberry", "assets/img/草莓.png");
  }
  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0); //將中心點訂為左上角
    const cantaloupeImage = this.add
      .image(80, 180, "cantaloupe")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.3) //0.3倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.next();
      });

    const strawberryImage = this.add
      .image(480, 180, "strawberry")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.3) //0.35
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        strawberryImage.destroy();
      });

    this.question = this.add.text(900, 325, "哈密瓜", {
      fontSize: "65px",
      color: "#00BBFF",
    });
  }
  next() {
    // 實現進入下一關的邏輯，例如：
    this.scene.start("Scene2_2");
  }
}
