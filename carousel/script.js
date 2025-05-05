class Carousel {
  constructor(container, options) {
    this.container = container;
    this.autoPlay = options.autoPlay || false;
    this.intervalTime = options.intervalTime || 3000;
    this.images = options.images || [];
    this.currentIndex = 0;
    this.timer = null;
    this.createCarousel();

    this.carouselInner = this.carousel.querySelector(".carousel-inner");
    this.items = this.carousel.querySelectorAll(".carousel-item");
    this.prevBtn = this.carousel.querySelector(".carousel-control.left");
    this.nextBtn = this.carousel.querySelector(".carousel-control.right");

    this.totalItems = this.items.length;

    this.init();
  }

  createCarousel() {
    this.carousel = document.createElement("div");
    this.carousel.classList.add("carousel");
    this.carousel.innerHTML = `
      <div class="carousel-inner">
        ${this.images
          .map(
            (img) =>
              `<div class="carousel-item">
                <img src="${img.src}" alt="${img.alt}" />
              </div>`
          )
          .join("")}
      </div>
      <button class="carousel-control left">&lt;</button>
      <button class="carousel-control right">&gt;</button>
    `;

    this.container.appendChild(this.carousel);
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());
    window.addEventListener("resize", () => this.updateCarousel());
    if (this.autoPlay) this.startAutoPlay();
  }

  updateCarousel() {
    this.carouselInner.style.transform = `translateX(-${
      this.currentIndex * 100
    }%)`;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.totalItems) % this.totalItems;
    this.updateCarousel();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalItems;
    this.updateCarousel();
  }

  startAutoPlay() {
    this.timer = setInterval(() => this.nextSlide(), this.intervalTime);
    this.carousel.addEventListener("mouseover", () =>
      clearInterval(this.timer)
    );
    this.carousel.addEventListener("mouseleave", () => this.startAutoPlay());
  }
}

const carouselContainer = document.querySelector(".container");

const carousels = [
  {
    autoPlay: true,
    intervalTime: 5000,
    images: [
      { src: "https://picsum.photos/536/354", alt: "Image 1" },
      { src: "https://picsum.photos/536/352", alt: "Image 2" },
      { src: "https://picsum.photos/536/353", alt: "Image 3" },
    ],
  },
  {
    autoPlay: true,
    intervalTime: 5000,
    images: [
      { src: "https://picsum.photos/536/354", alt: "Image 1" },
      { src: "https://picsum.photos/536/352", alt: "Image 2" },
      { src: "https://picsum.photos/536/353", alt: "Image 3" },
    ],
  },
];

carousels.forEach((carouselData) => {
  new Carousel(carouselContainer, carouselData);
});
