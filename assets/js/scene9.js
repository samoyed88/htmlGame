class Scene9 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene9" });
  }

  preload() {
    this.load.image("background9", "assets/img/background9.png");
  }

  create() {
    this.add.image(0, 0, "background9").setOrigin(0, 0); // 將中心點設為左上角

    // 設定遊戲樣式和元素
    this.add
      .text(400, 50, "記憶數字遊戲", { fontSize: "32px", color: "#000" })
      .setOrigin(0.5);

    this.numberText = this.add
      .text(1000, 380, "", { fontSize: "48px", color: "#000" })
      .setOrigin(0.5);

    this.messageText = this.add
      .text(400, 500, "", { fontSize: "24px", color: "#000" })
      .setOrigin(0.5);

    this.optionsGroup = this.add.group();

    this.interactionEnabled = false; // 初始禁用互動

    this.startGame();
  }

  generateSequence(length) {
    this.sequence = [];
    let numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * numbers.length);
      this.sequence.push(numbers[randomIndex]);
      numbers.splice(randomIndex, 1);
    }
  }

  displaySequence() {
    this.numberText.setText(this.sequence.join(""));
  }

  hideSequence() {
    this.numberText.setText("");
    this.enableInteraction(); // 隱藏題目後啟用互動
  }

  displayOptions() {
    this.optionsGroup.clear(true, true);
    let numbers = Array.from({ length: 9 }, (_, i) => i + 1);
    this.shuffleArray(numbers);

    numbers.forEach((number) => {
      let option = this.add
        .text(0, 0, number, {
          fontSize: "40px",
          color: "#000",
          backgroundColor: "#fff",
        })
        .setInteractive()
        .on("pointerdown", () => this.checkNumber(number, option));
      this.optionsGroup.add(option);
    });

    Phaser.Actions.GridAlign(this.optionsGroup.getChildren(), {
      width: 3,
      height: 3,
      cellWidth: 150,
      cellHeight: 150,
      x: 290,
      y: 300,
    });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  startGame() {
    this.generateSequence(5);
    this.displaySequence();
    this.displayOptions();
    this.messageText.setText("");
    this.currentStep = 0;
    this.userSequence = [];

    this.disableInteraction(); // 開始遊戲時禁用互動
    this.time.delayedCall(3000, this.hideSequence, [], this);
  }

  checkNumber(num, optionElement) {
    if (!this.interactionEnabled) return; // 如果未啟用互動則返回

    if (this.sequence.length === 0) return;

    this.userSequence.push(num);
    optionElement.setScale(2); // 將點選的數字變大到2倍
    if (
      this.userSequence[this.currentStep] === this.sequence[this.currentStep]
    ) {
      optionElement.setVisible(false);
      if (this.currentStep === this.sequence.length - 1) {
        this.scene.start("Next9");
      } else {
        this.currentStep++;
      }
    } else {
      this.messageText.setText("抱歉，答錯了。再試一次！").setColor("red");
      this.time.delayedCall(
        3000,
        () => {
          this.messageText.setText("");
          this.resetGame();
        },
        [],
        this
      );
    }
  }

  resetGame() {
    this.currentStep = 0;
    this.userSequence = [];
    this.optionsGroup.getChildren().forEach((option) => {
      option.setVisible(true);
      option.setScale(1); // 重置數字大小
    });
    this.displaySequence();
    this.disableInteraction(); // 重置遊戲時禁用互動
    this.time.delayedCall(3000, this.hideSequence, [], this);
  }

  disableInteraction() {
    this.interactionEnabled = false;
  }

  enableInteraction() {
    this.interactionEnabled = true;
  }
}
