class Scene2_2 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene2_2" });
    this.question = null;
  }

  preload() {
    this.load.image("background2", "assets/img/background2.png");
    this.load.image("斧頭", "assets/img/斧頭.png");
    this.load.image("曬衣夾", "assets/img/曬衣夾.png");
    this.load.image("球棒", "assets/img/球棒.png");
    this.load.image("衣架", "assets/img/衣架.png");
    this.load.image("確認", "assets/img/確認.png");
    this.load.image("水管", "assets/img/水管.png");
    this.load.image("鍋鏟", "assets/img/鍋鏟.png");
    this.load.image("cloth", "assets/img/cloth.png");
  }

  create() {
    // 加載背景圖片
    this.add.image(0, 0, "background2").setOrigin(0, 0); // 將中心點設為左上角
    this.add.image(600, 80, "cloth");
    // 定義六個位置
    let positions = [
      { x: 280, y: 400 },
      { x: 650, y: 400 },
      { x: 280, y: 750 },
      { x: 650, y: 750 },
      { x: 1020, y: 400 },
      { x: 1020, y: 750 },
    ];

    // 打亂位置數組
    this.shuffleArray(positions);

    // 白色區域顯示四張圖片，並分配隨機位置
    let items = [
      { key: "斧頭", x: positions[0].x, y: positions[0].y },
      { key: "曬衣夾", x: positions[1].x, y: positions[1].y },
      { key: "球棒", x: positions[2].x, y: positions[2].y },
      { key: "衣架", x: positions[3].x, y: positions[3].y },
      { key: "鍋鏟", x: positions[4].x, y: positions[4].y },
      { key: "水管", x: positions[5].x, y: positions[5].y },
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
      .image(650, 975, "確認")
      .setScale(0.4) // 0.3倍
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
      item.setTint(808080); // 設置為選中顏色
    }
  }

  // 檢查答案
  checkAnswer() {
    // 正確答案
    let correctItems = ["曬衣夾", "衣架"];

    // 檢查選擇的物品是否正確
    let isCorrect =
      correctItems.every((item) => this.selectedItems.includes(item)) &&
      this.selectedItems.length === correctItems.length;

    // 顯示結果
    if (isCorrect) {
      this.scene.start("Next2");
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
