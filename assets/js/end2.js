class End2 extends Phaser.Scene {
  constructor() {
    super({ key: "End2" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("end2", "assets/img/end2.png");
    this.load.image("back", "assets/img/返回鍵.png");
  }

  create() {
    this.add.image(0, 0, "end2").setOrigin(0, 0); //將中心點訂為左上角
    // 加載 "下一步" 圖片並設置為可點擊
    this.button = this.add
      .image(500, 725, "back")
      .setScale(0.5)
      .setOrigin(0, 0)
      .setInteractive();

    // 添加點擊事件來切換到 Scene1
    this.button.on("pointerup", () => {
      // 刪除背景
      //this.background.destroy();
      // 切換到 Scene1
      this.scene.start("Start");
    });
  }
}
