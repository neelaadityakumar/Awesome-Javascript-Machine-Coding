class Carousel {
  constructor(container, options) {
    this.container = container;
    this.images = options.images || [];
    this.totalItems = this.images.length;
    this.currentIndex = 0;
    this.createCarousel();
    this.bindEvents();
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

  bindEvents() {
    this.carouselInner = this.carousel.querySelector(".carousel-inner");
    this.items = this.carousel.querySelectorAll(".carousel-item");
    this.prevBtn = this.carousel
      .querySelector(".carousel-control.left")
      .addEventListener("click", () => this.prevSlide());
    this.nextBtn = this.carousel
      .querySelector(".carousel-control.right")
      .addEventListener("click", () => this.nextSlide());
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
}

const carouselContainer = document.querySelector(".container");

const carousels = [
  {
    images: [
      { src: "https://picsum.photos/536/354", alt: "Image 1" },
      { src: "https://picsum.photos/536/352", alt: "Image 2" },
      { src: "https://picsum.photos/536/353", alt: "Image 3" },
    ],
  },
  {
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
