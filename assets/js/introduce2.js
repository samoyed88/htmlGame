class Introduce2 extends Phaser.Scene {
  constructor() {
    super({ key: "Introduce2" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("ins2", "assets/img/ins2.png");
    this.load.image("next", "assets/img/next.png");
  }

  create() {
    this.add.image(0, 0, "ins2").setOrigin(0, 0); // Set the top-left corner as the origin

    // Load the "next" image and make it clickable
    this.button = this.add
      .image(900, 900, "next")
      .setScale(0.1)
      .setOrigin(0, 0)
      .setInteractive();

    // Add a click event to switch to either Scene2 or Scene2_2 randomly
    this.button.on("pointerup", () => {
      // Randomly choose between Scene2 and Scene2_2
      let randomScene = Phaser.Math.Between(1, 2);
      let sceneKey = randomScene === 1 ? "Scene2" : "Scene2_2";

      // Start the chosen scene
      this.scene.start(sceneKey);
    });
  }
}
