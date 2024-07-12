class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
  }

  preload() {
    this.load.image("start", "assets/img/start.png");
    this.load.image("back-start", "assets/img/background_start.png");
  }

  create() {
    this.add.image(0, 0, "back-start").setOrigin(0, 0);
    // 创建开始游戏按钮
    this.add
      .image(950, 750, "start")
      .setScale(0.8)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.startGame();
      });
  }

  startGame() {
    //this.scene.start("Instructions");
    //this.scene.start("Scene9");
    this.scene.start("Introduce3");
  }
}
