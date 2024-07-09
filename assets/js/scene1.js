class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1" });
  }

  preload() {
    this.load.image("background1", "assets/img/background1.png");
    this.load.image("aImg", "assets/img/底.png");
    this.load.image("bImg", "assets/img/底.png");
    this.load.image("cImg", "assets/img/底.png");
    this.load.image("dImg", "assets/img/底.png");
  }

  create() {
    this.add.image(0, 0, "background1").setOrigin(0, 0); // 将中心点定为左上角

    //得到兩個1~100隨機數
    const num1 = Math.floor(Math.random() * 99 + 1);
    const num2 = Math.floor(Math.random() * 99 + 1);
    const question = num1 + "+" + num2 + "=";
    const correctAnswer = num1 + num2;
    const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) + 1;
    const wrongAnswer2 = correctAnswer + Math.floor(Math.random() * 10) + 1;
    const wrongAnswer3 = correctAnswer + Math.floor(Math.random() * 10) + 1;
    const wrongAnswer4 = correctAnswer + Math.floor(Math.random() * 10) + 1;
    // 創建四個變數，初始化為 false
    let var1 = false;
    let var2 = false;
    let var3 = false;
    let var4 = false;

    // 隨機生成一個介於 0 到 3 之間的整數
    const randomIndex = Math.floor(Math.random() * 4);

    // 根據隨機生成的索引，將對應的變數設置為 true
    switch (randomIndex) {
      case 0:
        var1 = true;
        break;
      case 1:
        var2 = true;
        break;
      case 2:
        var3 = true;
        break;
      case 3:
        var4 = true;
        break;
      default:
        break;
    }

    // 创建a方块
    const aAnswer = var1 ? correctAnswer : wrongAnswer;
    const aContainer = this.add.container(200, 300);
    const aImage = this.add
      .image(0, 0, "aImg")
      .setScale(0.2)
      .setInteractive({ useHandCursor: true });
    const aText = this.add.text(-40, -23, aAnswer, {
      fontSize: "50px",
      color: "#00BBFF",
    });

    aContainer.add([aImage, aText]);

    // 创建b方块
    const bAnswer = var2 ? correctAnswer : wrongAnswer2;
    const bContainer = this.add.container(600, 300);
    const bImage = this.add
      .image(0, 0, "aImg")
      .setScale(0.2)
      .setInteractive({ useHandCursor: true });
    const bText = this.add.text(-40, -23, bAnswer, {
      fontSize: "50px",
      color: "#00BBFF",
    });
    bContainer.add([bImage, bText]);

    // 创建c方块
    const cAnswer = var3 ? correctAnswer : wrongAnswer3;
    const cContainer = this.add.container(200, 550);
    const cImage = this.add
      .image(0, 0, "aImg")
      .setScale(0.2)
      .setInteractive({ useHandCursor: true });
    const cText = this.add.text(-40, -23, cAnswer, {
      fontSize: "50px",
      color: "#00BBFF",
    });
    cContainer.add([cImage, cText]);

    // 创建d方块
    const dAnswer = var4 ? correctAnswer : wrongAnswer4;
    const dContainer = this.add.container(600, 550);
    const dImage = this.add
      .image(0, 0, "aImg")
      .setScale(0.2)
      .setInteractive({ useHandCursor: true });
    const dText = this.add.text(-40, -23, dAnswer, {
      fontSize: "50px",
      color: "#00BBFF",
    });

    dContainer.add([dImage, dText]);

    this.add.text(900, 325, question, {
      fontSize: "50px",
      color: "#00BBFF",
    });

    aImage.on("pointerup", () => {
      this.next(var1, "a", aImage, aText);
    });

    bImage.on("pointerup", () => {
      this.next(var2, "b", bImage, bText);
    });

    cImage.on("pointerup", () => {
      this.next(var3, "c", cImage, cText);
    });

    dImage.on("pointerup", () => {
      this.next(var4, "d", dImage, dText);
    });
  }

  next(var0, chosen, image, text) {
    if (chosen === "a") {
      if (var0) {
        this.scene.start("Introduce2");
      } else {
        image.destroy();
        text.destroy();
      }
    } else if (chosen === "b") {
      if (var0) {
        this.scene.start("Introduce2");
      } else {
        image.destroy();
        text.destroy();
      }
    } else if (chosen === "c") {
      if (var0) {
        this.scene.start("Introduce2");
      } else {
        image.destroy();
        text.destroy();
      }
    } else if (chosen === "d") {
      if (var0) {
        this.scene.start("Introduce2");
      } else {
        image.destroy();
        text.destroy();
      }
    }
  }
}
