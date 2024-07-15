class Scene6 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene6" });
  }

  preload() {
    this.load.image("redLight", "assets/img/red.png");
    this.load.image("greenLight", "assets/img/green.png");
    this.load.image("background6", "assets/img/background6.png");
  }

  create() {
    this.add.image(0, 0, "background6").setOrigin(0, 0);
    this.currentLight = "red";
    this.switchToRedLight();

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.currentLight === "red") {
          this.switchToGreenLight();
          this.currentLight = "green";
        } else {
          this.switchToRedLight();
          this.currentLight = "red";
        }
      },
    });
  }

  switchToRedLight() {
    this.redLight = this.add.image(440, 500, "redLight").setScale(0.28);

    if (this.greenLight) {
      this.greenLight.destroy();
      this.greenLight = null;
    }
  }

  switchToGreenLight() {
    const redLightWidth = this.redLight.width * 0.2;
    const greenLightX = this.redLight.x + redLightWidth + 180;
    this.greenLight = this.add
      .image(greenLightX, 500, "greenLight")
      .setScale(0.28)
      .setInteractive();

    if (this.redLight) {
      this.redLight.destroy();
      this.redLight = null;
    }

    this.greenLight.on("pointerup", () => {
      this.scene.start("Next6");
    });
  }
}
