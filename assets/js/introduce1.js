class Introduce1 extends Phaser.Scene {
  constructor() {
    super({ key: "Introduce1" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("ins1", "assets/img/ins1.png");
    this.load.image("next", "assets/img/下一步.png");
  }

  create() {
    this.add.image(0, 0, "ins1").setOrigin(0, 0); //將中心點訂為左上角
    // 加載 "下一步" 圖片並設置為可點擊
    this.button = this.add
      .image(900, 850, "next")
      .setScale(0.47)
      .setOrigin(0, 0)
      .setInteractive();

    // 添加點擊事件來切換到 Scene1
    this.button.on("pointerup", () => {
      // 刪除背景
      //this.background.destroy();
      // 切換到 Scene1
      this.scene.start("Scene1");
    });
  }
}
