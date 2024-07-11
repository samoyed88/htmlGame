class test extends Phaser.Scene {
  constructor() {
    super({ key: "test" });
  }

  preload() {
    // 加載資源
    this.load.image("levelCompleteBg", "path/to/background.png");
    this.load.image("restartButton", "path/to/0.png");
    this.load.image("nextButton", "path/to/24.png");
  }

  create() {
    // 添加背景
    this.add.image(400, 300, "levelCompleteBg");

    // 添加過關文字
    this.add
      .text(400, 150, "Level Complete!", {
        fontSize: "48px",
        fill: "#FFF",
        fontStyle: "bold",
        stroke: "#000",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    // 添加重新開始按鈕
    const restartButton = this.add
      .image(400, 300, "restartButton")
      .setInteractive()
      .on("pointerdown", () => this.scene.start("MainScene"));

    // 添加進入下一關按鈕
    const nextButton = this.add
      .image(400, 400, "nextButton")
      .setInteractive()
      .on("pointerdown", () => {
        // 假設我們有一個NextLevelScene
        // this.scene.start('NextLevelScene');
        console.log("Next Level Button Clicked");
      });

    // 添加按鈕的 hover 效果
    this.addHoverEffect(restartButton);
    this.addHoverEffect(nextButton);
  }

  addHoverEffect(button) {
    button.on("pointerover", () => button.setScale(1.1));
    button.on("pointerout", () => button.setScale(1.0));
  }
}
