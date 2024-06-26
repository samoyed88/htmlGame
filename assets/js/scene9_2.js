class Scene9_2 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene9_2" });
  }

  preload() {
    this.load.image("background", "assets/img/background.png");
    this.load.image("斧頭", "assets/img/斧頭.png");
    this.load.image("曬衣夾", "assets/img/曬衣夾.png");
    this.load.image("球棒", "assets/img/球棒.png");
    this.load.image("衣架", "assets/img/衣架.png");
    this.load.image("確認", "assets/img/確認.png");
  }

  create() {
    // 加載背景圖片
    this.add
      .image(0, 0, "background")
      .setScale(1) // 0.6倍
      .setOrigin(0, 0); // 將中心點設為左上角

    // 定義四個位置
    let positions = [
      { x: 150, y: 250 },
      { x: 500, y: 250 },
      { x: 150, y: 500 },
      { x: 500, y: 500 },
    ];

    // 打亂位置數組
    this.shuffleArray(positions);

    // 白色區域顯示四張圖片，並分配隨機位置
    let items = [
      { key: "斧頭", x: positions[0].x, y: positions[0].y },
      { key: "曬衣夾", x: positions[1].x, y: positions[1].y },
      { key: "球棒", x: positions[2].x, y: positions[2].y },
      { key: "衣架", x: positions[3].x, y: positions[3].y },
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

    this.add
      .image(750, 380, "確認")
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
    let correctItems = ["衣架", "曬衣夾"];

    // 檢查選擇的物品是否正確
    let isCorrect =
      correctItems.every((item) => this.selectedItems.includes(item)) &&
      this.selectedItems.length === correctItems.length;

    // 顯示結果
    if (isCorrect) {
      this.scene.start("Scene9_3");
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

  // 打亂數組的函數
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
