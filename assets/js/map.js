class Map extends Phaser.Scene {
  constructor() {
    super({ key: "Map" });
    this.button = null;
    //this.background = null;
  }

  preload() {
    //this.load.image("pre_background", "assets/img/前言.png");
    this.load.image("next", "assets/img/下一步.png");
  }

  create() {
    // 加載背景圖片
    //this.background = this.add.image(0, 0, "pre_background").setOrigin(0, 0); // 將中心點設為左上角

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
      this.scene.start("Instructions");
    });
  }
}
