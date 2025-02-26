class TrafficLight {
  constructor(rootEl, { initialColor, config, layout = "horizontal" }) {
    this.rootEl = rootEl;
    this.config = config;
    this.currentColor = initialColor;
    this.layout = layout;
    this.timer = null;

    this.rootEl.innerHTML = `<div class="traffic-light-container ${
      this.layout === "vertical" ? "traffic-light-container--vertical" : ""
    }" aria-live="polite"></div>`;
    this.containerEl = this.rootEl.querySelector(".traffic-light-container");

    this.runTrafficLight();
    window.addEventListener("beforeunload", () => this.clearTimer());
  }

  updateLight() {
    this.containerEl.setAttribute(
      "aria-label",
      `Current light: ${this.currentColor}`
    );

    this.containerEl.innerHTML = Object.keys(this.config)
      .map((color) => {
        return `<div class="light" style="background-color: ${
          color === this.currentColor
            ? this.config[color].backgroundColor
            : "#555"
        };" aria-hidden="true"></div>`;
      })
      .join("");
  }

  transitionLight() {
    const { duration, next } = this.config[this.currentColor];
    this.timer = setTimeout(() => {
      this.currentColor = next;
      this.runTrafficLight();
    }, duration);
  }

  runTrafficLight() {
    this.updateLight();
    this.transitionLight();
  }

  clearTimer() {
    clearTimeout(this.timer);
  }
}

const config = {
  green: { backgroundColor: "green", duration: 3000, next: "yellow" },
  yellow: { backgroundColor: "yellow", duration: 500, next: "red" },
  red: { backgroundColor: "red", duration: 4000, next: "green" },
};

document.querySelectorAll(".traffic-light").forEach((wrapper, index) => {
  new TrafficLight(wrapper, {
    initialColor: "red",
    config,
    layout: index === 0 ? "vertical" : "horizontal",
  });
});
