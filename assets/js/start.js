class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
  }

  preload() {
    // 加载游戏所需资源
    this.load.image("start", "assets/img/start.png");
    // 加载其他必要资源
    this.load.image("back-start", "assets/img/background-start.png");
  }

  create() {
    this.add.image(0, 0, "back-start").setOrigin(0, 0);
    // 创建开始游戏按钮
    this.add
      .image(950, 650, "start")
      .setScale(0.8)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.startGame();
      });

    // 添加一个按钮来测试API请求
    this.add
      .text(400, 500, "测试API", { fontSize: "32px", fill: "#fff" })
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.sendApiRequest();
      });
  }

  startGame() {
    // 这里是开始游戏的逻辑
    // 可以跳转到游戏的预设场景或者其他必要的处理
    this.scene.start("Instructions");
  }

  async sendApiRequest() {
    const gameID =
      "6b8e64829e4c9e24745cefe4fcff5d7e3d9edd421055982d48af18753c0837e6"; // 替换为实际的GameID
    const params = new URLSearchParams({
      RecordID: "null",
      Token: "null",
      GameID: gameID,
      GameLevel: "null",
      Status: "null",
    });

    const url = `https://www.gyrigym.com/TestApiPostGameData/eyJSZWNvcmRJRCI6bnVsbCwiVG9rZW4iOm51bGwsIkdhbWVJRCI6IjZiOGU2NDgyOWU0YzllMjQ3NDVjZWZlNGZjZmY1ZDdlM2Q5ZWRkNDIxMDU1OTgyZDQ4YWYxODc1M2MwODM3ZTYiLCJHYW1lTGV2ZWwiOm51bGwsIlN0YXR1cyI6bnVsbH0=`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`API请求失败: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log("API响应成功:", data.RecordID, data.Token);
        // 根据返回的数据做进一步处理，例如更新游戏状态等
      } else {
        console.log("API响应失败:", data.message);
      }
    } catch (error) {
      console.error("API请求错误:", error);
    }
  }
}
