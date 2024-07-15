class Next8 extends Phaser.Scene {
  constructor() {
    super({ key: "Next8" });
    this.button = null;
    this.start = null;
    this.password = "";
  }

  preload() {
    this.load.image("next8", "assets/img/next8.png");
    this.load.image("next0", "assets/img/next0.png");
  }

  create() {
    this.add.image(0, 0, "next8").setOrigin(0, 0);

    this.password = this.generatePassword(4);
    this.registry.set("password", this.password);

    this.add
      .text(1400, 700, `${this.password}`, {
        fontSize: "80px",
        color: "#000",
      })
      .setOrigin(0.5);

    this.button = this.add
      .image(1400, 800, "next0")
      .setScale(0.3)
      .setOrigin(0, 0)
      .setInteractive();

    this.button.on("pointerup", () => {
      this.scene.start("Scene9");
    });
  }

  generatePassword(length) {
    const digits = "123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      password += digits[randomIndex];
    }
    return password;
  }
}
