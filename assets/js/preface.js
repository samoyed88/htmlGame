class Preface extends Phaser.Scene {
  constructor() {
    super({ key: "Preface" });
    this.button = null;
    this.start = null;
  }
  preload() {
    this.load.image("background", "assets/img/前言.png");
    this.load.image("next", "assets/img/下一步.png");
  }

  create() {
    // 加載背景圖片
    this.add.image(0, 0, "background").setOrigin(0, 0); // 將中心點設為左上角
    this.add.image(500, 850, "next").setOrigin(0, 0);
  }
}
