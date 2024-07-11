class Introduce3 extends Phaser.Scene {
  constructor() {
    super({ key: "Introduce3" });
    this.button = null;
    this.start = null;
  }

  preload() {
    this.load.image("ins3", "assets/img/ins3.png");
    this.load.image("next", "assets/img/next.png");
  }

  create() {
    this.add.image(0, 0, "ins3").setOrigin(0, 0); // Set the top-left corner as the origin

    // Load the "next" image and make it clickable
    this.button = this.add
      .image(900, 900, "next")
      .setScale(0.1)
      .setOrigin(0, 0)
      .setInteractive();

    // Add a click event to switch to either Scene3, Scene3_2, or Scene3_3 randomly
    this.button.on("pointerup", () => {
      // Randomly choose between Scene3, Scene3_2, and Scene3_3
      let randomScene = Phaser.Math.Between(1, 3);
      let sceneKey = `Scene3_${randomScene}`;

      // Start the chosen scene
      this.scene.start(sceneKey);
    });
  }
}
