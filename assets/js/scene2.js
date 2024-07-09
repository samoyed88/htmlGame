class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene2" });
    this.question = null;
  }

  preload() {
    this.load.image("background1", "assets/img/background1.png");
    this.load.image("雨傘", "assets/img/雨傘.png");
    this.load.image("雨衣", "assets/img/雨衣.png");
    this.load.image("螺絲起子", "assets/img/螺絲起子.png");
    this.load.image("遙控器", "assets/img/遙控器.png");
    this.load.image("鍋鏟", "assets/img/鍋鏟.png");
    this.load.image("電鍋", "assets/img/電鍋.png");
    this.load.image("確認", "assets/img/確認.png");
  }

  create() {
    // 加載背景圖片
    this.add.image(0, 0, "background1").setOrigin(0, 0); // 將中心點設為左上角

    // 定義六個位置
    let positions = [
      { x: 300, y: 380 },
      { x: 680, y: 380 },
      { x: 300, y: 820 },
      { x: 680, y: 820 },
      { x: 1000, y: 380 },
      { x: 1000, y: 820 },
    ];

    // 打亂位置數組
    this.shuffleArray(positions);

    // 白色區域顯示四張圖片，並分配隨機位置
    let items = [
      { key: "雨傘", x: positions[0].x, y: positions[0].y },
      { key: "雨衣", x: positions[1].x, y: positions[1].y },
      { key: "螺絲起子", x: positions[2].x, y: positions[2].y },
      { key: "遙控器", x: positions[3].x, y: positions[3].y },
      { key: "鍋鏟", x: positions[4].x, y: positions[4].y },
      { key: "電鍋", x: positions[5].x, y: positions[5].y },
    ];

    // 用於儲存玩家選擇的物品
    this.selectedItems = [];

    // 加載和顯示每個物品，並使它們可點擊
    items.forEach((item) => {
      let obj = this.add.image(item.x, item.y, item.key).setInteractive();
      obj.setScale(0.3);
      obj.setData("name", item.key);
      obj.on("pointerdown", () => {
        this.toggleSelection(obj);
      });
    });

    this.add
      .image(1280, 595, "確認")
      .setScale(0.3) // 0.3倍
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.checkAnswer();
      });

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
      this.scene.start("Introduce3");
    } else {
      this.showPopup("錯誤");
    }
  }

  // 創建彈出視窗
  createPopup() {
    this.popup = this.add.container(400, 300);
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

  // 打亂數組的函數
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
