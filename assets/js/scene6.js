class Scene6 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene6" });
  }

  preload() {
    this.load.image("redLight", "assets/img/red.png");
    this.load.image("greenLight", "assets/img/green.png");
  }

  create() {
    this.currentLight = "red";
    this.switchToRedLight();

    // 設置定時器每秒切換一次燈號
    this.time.addEvent({
      delay: 1000, // 每隔一秒觸發一次
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
    this.redLight = this.add.image(400, 300, "redLight").setScale(0.2);

    if (this.greenLight) {
      this.greenLight.destroy();
      this.greenLight = null;
    }
  }

  switchToGreenLight() {
    // 移動綠燈到紅燈右邊的位置
    const redLightWidth = this.redLight.width * 0.2; // 紅燈的寬度
    const greenLightX = this.redLight.x + redLightWidth + 20; // 20 是紅燈和綠燈之間的距離，可根據需要調整
    this.greenLight = this.add
      .image(greenLightX, 300, "greenLight")
      .setScale(0.2)
      .setInteractive();

    if (this.redLight) {
      this.redLight.destroy();
      this.redLight = null;
    }

    // 點擊事件
    this.greenLight.on("pointerup", () => {
      this.scene.start("Scene1"); // 切換到下一個場景
    });
  }
}
