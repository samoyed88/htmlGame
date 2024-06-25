class Scene10 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene10" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
  }

  create() {
    this.add
      .image(0, 0, "background")
      .setScale(0.6) // 0.6倍
      .setOrigin(0, 0); // 将中心点定为左上角

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

    this.startGame();
  }

  update() {
    // 遊戲更新邏輯
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

    this.time.delayedCall(3000, this.hideSequence, [], this);
  }

  checkNumber(num, optionElement) {
    if (this.sequence.length === 0) return;

    this.userSequence.push(num);
    if (
      this.userSequence[this.currentStep] === this.sequence[this.currentStep]
    ) {
      optionElement.setVisible(false);
      if (this.currentStep === this.sequence.length - 1) {
        this.messageText.setText("恭喜你，答對了！").setColor("green");
      } else {
        this.currentStep++;
      }
    } else {
      this.messageText.setText("抱歉，答錯了。再試一次！").setColor("red");
      this.resetGame();
    }
  }

  resetGame() {
    this.currentStep = 0;
    this.userSequence = [];
    this.optionsGroup
      .getChildren()
      .forEach((option) => option.setVisible(true));
    this.displaySequence();
    this.time.delayedCall(3000, this.hideSequence, [], this);
  }
}