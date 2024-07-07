class Introduce6 extends Phaser.Scene {
  constructor() {
    super({ key: "Introduce6" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("ins6", "assets/img/ins6.png");
    this.load.image("next", "assets/img/下一步.png");
  }

  create() {
    this.add.image(0, 0, "ins6").setOrigin(0, 0); //將中心點訂為左上角
    // 加載 "下一步" 圖片並設置為可點擊
    this.button = this.add
      .image(900, 900, "next")
      .setScale(0.47)
      .setOrigin(0, 0)
      .setInteractive();

    // 添加點擊事件來切換到 Scene1
    this.button.on("pointerup", () => {
      // 刪除背景
      //this.background.destroy();
      // 切換到 Scene2
      this.scene.start("Scene6");
    });
  }
}
