class Next8 extends Phaser.Scene {
  constructor() {
    super({ key: "Next8" });
    this.button = null;
    this.start = null;
    this.password = ""; // 用於存儲生成的四位數密碼
  }

  preload() {
    this.load.image("next8", "assets/img/next8.png");
    this.load.image("next0", "assets/img/next0.png");
  }

  create() {
    // 加載背景圖片，將中心點設為左上角
    this.add.image(0, 0, "next8").setOrigin(0, 0);

    // 生成四位數密碼並存儲在 registry 中
    this.password = this.generatePassword(4);
    this.registry.set("password", this.password);

    // 在畫面上顯示生成的密碼
    this.add
      .text(1400, 700, `${this.password}`, {
        fontSize: "80px",
        color: "#000",
      })
      .setOrigin(0.5);

    // 加載 "下一步" 圖片並設置為可點擊
    this.button = this.add
      .image(1400, 800, "next0")
      .setScale(0.3)
      .setOrigin(0, 0)
      .setInteractive();

    // 添加點擊事件來切換到 Scene9
    this.button.on("pointerup", () => {
      this.scene.start("Scene9");
    });
  }

  generatePassword(length) {
    // 生成指定長度的隨機數字密碼
    const digits = "123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      password += digits[randomIndex];
    }
    return password;
  }
}
