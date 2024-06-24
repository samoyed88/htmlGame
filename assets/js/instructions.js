class instructions extends Phaser.Scene {
    constructor() {
      super({ key: "instructions" });
      this.button = null;
      this.start = null;
    }
    preload() {
        this.load.image("遊戲說明", "assets/img/遊戲說明.png");
        this.load.image("返回鍵", "assets/img/返回鍵.png");
      }
      create() {
        this.add
          .image(0, 0, "遊戲說明")
          .setScale(0.6) //0.8倍
          .setOrigin(0, 0); //將中心點訂為左上角
          this.button = this.add
          .image(140, 356, "返回鍵")
          .setOrigin(0, 0)
          .setScale(0.45)
          .setInteractive({ useHandCursor: true })
          .on("pointerup", () => {
            this.next();
          });
      }
      next() {
        this.scene.start("Start");
      }
      update() {}
}