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
    this.add
      .image(0, 0, "background")
      .setScale(0.6) //0.8倍
      .setOrigin(0, 0); //將中心點訂為左上角
    const cantaloupeImage = this.add
      .image(100, 150, "cantaloupe")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.3) //0.3倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.next();
      });

    const strawberryImage = this.add
      .image(500, 150, "strawberry")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.3) //0.35
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        yellowImage.destroy();
      });

    this.question = this.add.text(900, 325, "哈密瓜", {
      fontSize: "65px",
      color: "#00BBFF",
    });
  }
}
