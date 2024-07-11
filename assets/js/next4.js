class Next4 extends Phaser.Scene {
  constructor() {
    super({ key: "Next4" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("next4", "assets/img/next4.png");
    this.load.image("next0", "assets/img/next0.png");
  }

  create() {
    this.add.image(0, 0, "next4").setOrigin(0, 0); //將中心點訂為左上角
    // 加載 "下一步" 圖片並設置為可點擊
    this.button = this.add
      .image(900, 950, "next0")
      .setScale(0.1)
      .setOrigin(0, 0)
      .setInteractive();

    // 添加點擊事件來切換到 Scene1
    this.button.on("pointerup", () => {
      // 刪除背景
      //this.background.destroy();
      // 切換到 Scene1
      this.scene.start("Introduce5");
    });
  }
}
