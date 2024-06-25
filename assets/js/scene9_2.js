class Scene9_2 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene9_2" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("雨傘", "assets/img/雨傘.png");
    this.load.image("雨衣", "assets/img/雨衣.png");
    this.load.image("螺絲起子", "assets/img/螺絲起子.png");
    this.load.image("遙控器", "assets/img/遙控器.png");
  }

  create() {
    // 加載背景圖片
    this.add
      .image(0, 0, "background")
      .setScale(0.6) // 0.6倍
      .setOrigin(0, 0); // 將中心點設為左上角

    // 定義物品和它們的位置
    let items = [
      { key: "雨傘", x: 150, y: 250 },
      { key: "雨衣", x: 500, y: 250 },
      { key: "螺絲起子", x: 150, y: 500 },
      { key: "遙控器", x: 500, y: 500 },
    ];

    // 用於儲存玩家選擇的物品
    this.selectedItems = [];

    // 加載和顯示每個物品，並使它們可點擊
    items.forEach((item) => {
      let obj = this.add.image(item.x, item.y, item.key).setInteractive();
      obj.setScale(0.2);
      obj.setData("name", item.key);
      obj.on("pointerdown", () => {
        this.toggleSelection(obj);
      });
    });

    // 顯示提交按鈕
    let submitButton = this.add
      .text(750, 450, "提交", { fontSize: "32px", fill: "#000" })
      .setInteractive()
      .on("pointerdown", () => this.checkAnswer());

    // 創建彈出視窗
    this.createPopup();
  }

  // 切換物品選擇狀態
  toggleSelection(item) {
    if (this.selectedItems.includes(item.getData("name"))) {
      // 如果已選擇則取消選擇
      this.selectedItems = this.selectedItems.filter(
        (i) => i !== item.getData("name")
      );
      item.setTint(0xffffff); // 恢復原色
    } else {
      // 如果未選擇則選擇
      this.selectedItems.push(item.getData("name"));
      item.setTint(0x00ff00); // 設置為選中顏色
    }
  }

  // 檢查答案
  checkAnswer() {
    // 正確答案
    let correctItems = ["雨傘", "雨衣"];

    // 檢查選擇的物品是否正確
    let isCorrect =
      correctItems.every((item) => this.selectedItems.includes(item)) &&
      this.selectedItems.length === correctItems.length;

    // 顯示結果
    if (isCorrect) {
      this.scene.start("Scene9_2");
    } else {
      this.showPopup("錯誤");
    }
  }

  // 創建彈出視窗
  createPopup() {
    this.popup = this.add.container(400, 300);
    let popupBackground = this.add.graphics();
    popupBackground.fillStyle(0x000000, 0.8);
    popupBackground.fillRect(-150, -100, 300, 200);
    let popupText = this.add
      .text(0, 0, "", { fontSize: "32px", fill: "#fff" })
      .setOrigin(0.5);
    this.popup.add([popupBackground, popupText]);
    this.popup.setVisible(false);
    this.popupText = popupText;
  }

  // 顯示彈出視窗
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
}