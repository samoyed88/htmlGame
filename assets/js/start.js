class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
    this.button = null;
    this.gamestart = null;
  }

  preload() {
    this.load.image("button", "assets/img/24.png");
  }

  create() {
    this.button = this.add
      .image(450, 250, "button")
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.gameStart();
      });
    
    this.gamestart = this.add.text(480, 318, "開始遊戲", {
      fontSize: "25px",
      color: "#ffffff"
    });
  }

  gameStart() {
    this.scene.start("Scene1");
  }

  update() {}
}
