class Scene9 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene9" });
  }

  preload() {
    this.load.image("background9", "assets/img/background9-box.png");
  }

  create() {
    this.add.image(0, 0, "background9").setOrigin(0, 0); // 將中心點設為左上角

    // 從 registry 中獲取四位數密碼
    this.password = this.registry.get("password");

    // 創建顯示輸入密碼的文本
    this.inputText = this.add
      .text(750, 100, "", { fontSize: "64px", color: "#000" })
      .setOrigin(0.5);

    this.messageText = this.add
      .text(750, 150, "", { fontSize: "24px", color: "#000" })
      .setOrigin(0.5);

    // 初始化用戶輸入的密碼
    this.userInput = "";

    // 初始化 optionsGroup
    this.optionsGroup = this.add.group();

    // 顯示九個數字按鈕
    this.displayOptions();
  }

  displayOptions() {
    let numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    this.shuffleArray(numbers);

    numbers.forEach((number) => {
      let option = this.add
        .text(0, 0, number, {
          fontSize: "60px", // 調整這裡以改變數字大小
          color: "#000",
          fontStyle: "bold", // 添加字體樣式為加粗
        })
        .setInteractive()
        .on("pointerdown", () => this.addNumberToInput(number));
      this.optionsGroup.add(option); // 添加數字按鈕到 optionsGroup
    });

    Phaser.Actions.GridAlign(this.optionsGroup.getChildren(), {
      width: 3,
      height: 3,
      cellWidth: 150,
      cellHeight: 150,
      x: 425,
      y: 600,
    });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  addNumberToInput(num) {
    if (this.userInput.length < 4) {
      this.userInput += num;
      this.inputText.setText(this.userInput);

      // 檢查密碼長度是否達到四位
      if (this.userInput.length === 4) {
        this.checkPassword();
      }
    }
  }

  checkPassword() {
    if (this.userInput === this.password) {
      this.messageText
        .setText("密碼正確，進入下一關！")
        .setColor("green")
        .setFontStyle("bold");
      this.time.delayedCall(1000, () => {
        this.scene.start("Next9");
      });
    } else {
      this.messageText
        .setText("密碼錯誤，正確密碼為：" + this.password)
        .setColor("red")
        .setFontStyle("bold");
      this.time.delayedCall(2000, () => {
        this.messageText.setText("");
        this.userInput = "";
        this.inputText.setText(this.userInput);
      });
    }
  }
}
