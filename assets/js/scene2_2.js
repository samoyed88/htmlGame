class Scene2_2 extends Phaser.Scene {
    constructor() {
      super({ key: "Scene2_2" });
      this.question = null;
    }
  
    preload() {
      this.load.image("background", "assets/img/background.png");
      this.load.image("cantaloupe", "assets/img/哈密瓜.png");
      this.load.image("strawberry", "assets/img/草莓.png");
      this.load.image("grape", "assets/img/葡萄.png");
      this.load.image("apple", "assets/img/蘋果.png");
    }
    create() {
      this.add
        .image(0, 0, "background")
        .setScale(0.6) //0.8倍
        .setOrigin(0, 0); //將中心點訂為左上角

      const cantaloupeImage = this.add
        .image(100, 50, "cantaloupe")
        .setOrigin(0, 0) //將中心點訂為左上角
        .setScale(0.25) //0.3倍
        .setInteractive({ useHandCursor: true })
        .on("pointerup", () => {
            cantaloupeImage.destroy();
        });
  
      const strawberryImage = this.add
        .image(500, 50, "strawberry")
        .setOrigin(0, 0) //將中心點訂為左上角
        .setScale(0.25) //0.35
        .setInteractive({ useHandCursor: true })
        .on("pointerup", () => {
            strawberryImage.destroy();
        });

        const grapeImage = this.add
        .image(100, 300, "grape")
        .setOrigin(0, 0) //將中心點訂為左上角
        .setScale(0.25) //0.35
        .setInteractive({ useHandCursor: true })
        .on("pointerup", () => {
            this.next();
        });

        const appleImage = this.add
        .image(500, 300, "apple")
        .setOrigin(0, 0) //將中心點訂為左上角
        .setScale(0.25) //0.35
        .setInteractive({ useHandCursor: true })
        .on("pointerup", () => {
            appleImage.destroy();
        });

  
      this.question = this.add.text(900, 325, "葡萄", {
        fontSize: "65px",
        color: "#00BBFF",
      });
    }
    next() {
      // 實現進入下一關的邏輯，例如：
      this.scene.start("Scene2_3");
    }
  }
  