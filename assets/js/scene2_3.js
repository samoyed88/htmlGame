class Scene2_3 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene2_3" });
    this.question = null;
  }
  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("cantaloupe", "assets/img/哈密瓜.png");
    this.load.image("strawberry", "assets/img/草莓.png");
    this.load.image("grape", "assets/img/葡萄.png");
    this.load.image("apple", "assets/img/蘋果.png");
    this.load.image("watermelon", "assets/img/西瓜.png");
    this.load.image("banana", "assets/img/香蕉.png");
  }
  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0); //將中心點訂為左上角

    const cantaloupeImage = this.add
      .image(100, 130, "cantaloupe")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.2) //0.3倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        cantaloupeImage.destroy();
      });

    const strawberryImage = this.add
      .image(300, 130, "strawberry")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.2) //0.35
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        strawberryImage.destroy();
      });

    const grapeImage = this.add
      .image(500, 130, "grape")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.2) //0.35
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        grapeImage.destroy();
      });

    const appleImage = this.add
      .image(100, 380, "apple")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.2) //0.35
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        appleImage.destroy();
      });

    const watermelonImage = this.add
      .image(300, 380, "watermelon")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.2) //0.35
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.next();
      });

    const bananaImage = this.add
      .image(500, 380, "banana")
      .setOrigin(0, 0) //將中心點訂為左上角
      .setScale(0.2) //0.35
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        bananaImage.destroy();
      });

    this.question = this.add.text(900, 325, "西瓜", {
      fontSize: "65px",
      color: "#00BBFF",
    });
  }
  next() {
    // 實現進入下一關的邏輯，例如：
    this.scene.start("Scene3_1");
  }
}
