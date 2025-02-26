class TrafficLight {
  constructor(rootEl, { initialColor, config, layout = "horizontal" }) {
    this.rootEl = rootEl;
    this.config = config;
    this.currentColor = initialColor;
    this.layout = layout;
    this.timer = null;

    this.containerEl = document.createElement("div");
    this.containerEl.classList.add("traffic-light-container");
    this.containerEl.setAttribute("aria-live", "polite");

    if (this.layout === "vertical") {
      this.containerEl.classList.add("traffic-light-container--vertical");
    }

    this.rootEl.appendChild(this.containerEl);
    this.runTrafficLight();

    window.addEventListener("beforeunload", () => this.clearTimer());
  }

  createLight(color) {
    const lightEl = document.createElement("div");
    lightEl.classList.add("light");
    lightEl.setAttribute("aria-hidden", true);
    if (color) lightEl.style.backgroundColor = color;
    return lightEl;
  }

  updateLight() {
    this.containerEl.innerHTML = "";
    this.containerEl.setAttribute(
      "aria-label",
      `Current light: ${this.currentColor}`
    );

    Object.keys(this.config).forEach((color) => {
      this.containerEl.append(
        this.createLight(
          color === this.currentColor
            ? this.config[color].backgroundColor
            : undefined
        )
      );
    });
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

// Traffic Light Configurations
const config = {
  green: { backgroundColor: "green", duration: 3000, next: "yellow" },
  yellow: { backgroundColor: "yellow", duration: 500, next: "red" },
  red: { backgroundColor: "red", duration: 4000, next: "green" },
};

// Attach to each traffic light wrapper
document.querySelectorAll(".traffic-light").forEach((wrapper, index) => {
  new TrafficLight(wrapper, {
    initialColor: "red",
    config,
    layout: index === 0 ? "vertical" : "horizontal", // First one vertical, second horizontal
  });
});
