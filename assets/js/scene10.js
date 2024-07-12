class Scene10 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene10" });
  }

  preload() {
    this.load.image("background10", "assets/img/background10.png");
    this.load.image("斧頭", "assets/img/斧頭.png");
    this.load.image("噴槍", "assets/img/噴槍.png");
    this.load.image("螺絲起子", "assets/img/螺絲起子.png");
    this.load.image("遙控器", "assets/img/遙控器.png");
  }

  create() {
    this.add.image(0, 0, "background10").setOrigin(0, 0);

    let positions = [
      { x: 400, y: 400 },
      { x: 900, y: 400 },
      { x: 400, y: 820 },
      { x: 900, y: 820 },
    ];

    this.shuffleArray(positions);

    let items = [
      { key: "斧頭", x: positions[0].x, y: positions[0].y },
      { key: "噴槍", x: positions[1].x, y: positions[1].y },
      { key: "螺絲起子", x: positions[2].x, y: positions[2].y },
      { key: "遙控器", x: positions[3].x, y: positions[3].y },
    ];

    this.selectedItems = [];

    items.forEach((item) => {
      let obj = this.add.image(item.x, item.y, item.key).setInteractive();
      obj.setScale(0.36);
      obj.setData("name", item.key);
      obj.on("pointerdown", () => {
        this.toggleSelection(obj);
      });
    });
  }

  toggleSelection(item) {
    if (item.getData("name") === "噴槍") {
      this.scene.start("Next10");
    } else {
      item.setVisible(false);
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
