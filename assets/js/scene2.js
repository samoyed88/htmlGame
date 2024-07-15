class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene2" });
    this.question = null;
  }

  preload() {
    this.load.image("background2", "assets/img/background2.png");
    this.load.image("雨傘", "assets/img/雨傘.png");
    this.load.image("雨衣", "assets/img/雨衣.png");
    this.load.image("螺絲起子", "assets/img/螺絲起子.png");
    this.load.image("遙控器", "assets/img/遙控器.png");
    this.load.image("鍋鏟", "assets/img/鍋鏟.png");
    this.load.image("電鍋", "assets/img/電鍋.png");
    this.load.image("確認", "assets/img/check.png");
    this.load.image("rain", "assets/img/rain.png");
  }

  create() {
    this.add.image(0, 0, "background2").setOrigin(0, 0);
    this.add.image(600, 80, "rain");
    let positions = [
      { x: 280, y: 400 },
      { x: 650, y: 400 },
      { x: 280, y: 750 },
      { x: 650, y: 750 },
      { x: 1020, y: 400 },
      { x: 1020, y: 750 },
    ];

    this.shuffleArray(positions);

    let items = [
      { key: "雨傘", x: positions[0].x, y: positions[0].y },
      { key: "雨衣", x: positions[1].x, y: positions[1].y },
      { key: "螺絲起子", x: positions[2].x, y: positions[2].y },
      { key: "遙控器", x: positions[3].x, y: positions[3].y },
      { key: "鍋鏟", x: positions[4].x, y: positions[4].y },
      { key: "電鍋", x: positions[5].x, y: positions[5].y },
    ];

    this.selectedItems = [];

    items.forEach((item) => {
      let obj = this.add.image(item.x, item.y, item.key).setInteractive();
      obj.setScale(0.3);
      obj.setData("name", item.key);
      obj.on("pointerdown", () => {
        this.toggleSelection(obj);
      });
    });

    this.add
      .image(650, 975, "確認")
      .setScale(1)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.checkAnswer();
      });

    this.createPopup();
  }

  toggleSelection(item) {
    if (this.selectedItems.includes(item.getData("name"))) {
      this.selectedItems = this.selectedItems.filter(
        (i) => i !== item.getData("name")
      );
      item.setTint(0xffffff);
    } else {
      this.selectedItems.push(item.getData("name"));
      item.setTint(808080);
    }
  }

  checkAnswer() {
    let correctItems = ["雨傘", "雨衣"];

    let isCorrect =
      correctItems.every((item) => this.selectedItems.includes(item)) &&
      this.selectedItems.length === correctItems.length;

    if (isCorrect) {
      this.scene.start("Next2");
    } else {
      this.showPopup("錯誤");
    }
  }

  createPopup() {
    this.popup = this.add.container(675, 600);
    let popupBackground = this.add.graphics();
    popupBackground.fillStyle(0x00ffff, 0.8);
    popupBackground.fillRect(-150, -100, 300, 200);
    let popupText = this.add
      .text(0, 0, "", {
        fontSize: "32px",
        fill: "#f00",
        padding: { top: 10, bottom: 10, left: 10, right: 10 },
      })
      .setOrigin(0.5);
    this.popup.add([popupBackground, popupText]);
    this.popup.setVisible(false);
    this.popupText = popupText;
  }

  showPopup(message) {
    this.popupText.setText(message);
    this.popup.setVisible(true);
    this.time.delayedCall(
      2000,
      () => {
        this.popup.setVisible(false);
      },
      [],
      this
    );
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
