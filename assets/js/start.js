class Start extends Phaser.Scene {
  constructor() {
    super({ key: "Start" });
  }

  preload() {
    this.load.image("illustrate", "assets/img/illustrate.png");
    this.load.image("start", "assets/img/start.png");
  }

  create() {
    this.add
      .image(530, 278, "start")
      .setScale(0.47)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.gameStart();
      });

    this.illustrate = this.add
      .image(530, 385, "illustrate")
      .setScale(0.38)
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.gameStart2();
      });

    // 添加一個按鈕來測試 API 請求
    this.add
      .text(400, 500, "測試API", { fontSize: "32px", fill: "#fff" })
      .setInteractive({ useHandCursor: true })
      .on("pointerup", () => {
        this.sendApiRequest();
      });
  }

  gameStart() {
    this.scene.start("Preface");
  }

  gameStart2() {
    this.scene.start("instructions");
  }

  async sendApiRequest() {
    const params = new URLSearchParams({
      RecordID: "null",
      Token: "null",
      GameID:
        "6b8e64829e4c9e24745cefe4fcff5d7e3d9edd421055982d48af18753c0837e6",
      GameLevel: "null",
      Status: "null",
    });

    const url = `http://www.gyrigym.com/TestApiPostGameData/?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log("API回應成功:", data.score);
        // 根據返回的數據更新場景，例如：
        // this.add.text(400, 550, `得分: ${data.score}`, { fontSize: "32px", fill: "#fff" });
      } else {
        console.log("API回應失敗:", data.message);
      }
    } catch (error) {
      console.error("API請求錯誤:", error);
    }
  }
}
