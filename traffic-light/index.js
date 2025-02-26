(() => {
  const config = {
    green: { backgroundColor: "green", duration: 3000, next: "yellow" },
    yellow: { backgroundColor: "yellow", duration: 500, next: "red" },
    red: { backgroundColor: "red", duration: 4000, next: "green" },
  };

  function createLight(color) {
    const lightEl = document.createElement("div");
    lightEl.classList.add("traffic-light");
    lightEl.setAttribute("aria-hidden", true);
    if (color) lightEl.style.backgroundColor = color;
    return lightEl;
  }

  function createTrafficLight(rootEl, { initialColor, config, layout }) {
    let currentColor = initialColor;
    const containerEl = document.createElement("div");
    containerEl.classList.add("traffic-light-container");
    containerEl.setAttribute("aria-live", "polite");
    if (layout === "vertical")
      containerEl.classList.add("traffic-light-container--vertical");

    let timer = null;

    function updateLight() {
      containerEl.innerHTML = "";
      containerEl.setAttribute("aria-label", `Current light: ${currentColor}`);
      Object.keys(config).forEach((color) => {
        containerEl.append(
          createLight(
            color === currentColor ? config[color].backgroundColor : undefined
          )
        );
      });
    }

    function transitionLight() {
      const { duration, next } = config[currentColor];
      timer = setTimeout(() => {
        currentColor = next;
        runTrafficLight();
      }, duration);
    }

    function runTrafficLight() {
      updateLight();
      transitionLight();
    }
    // The beforeunload event is fired before the tab/window is closed.
    // Clear the timer when the tab/window is about to be closed.

    window.addEventListener("beforeunload", () => clearTimeout(timer));

    rootEl.append(containerEl);
    runTrafficLight();
  }

  createTrafficLight(document.getElementById("traffic-light"), {
    initialColor: "red",
    config,
    layout: "horizontal",
  });

  createTrafficLight(document.getElementById("traffic-light-2"), {
    initialColor: "red",
    config,
    layout: "vertical",
  });
})();
