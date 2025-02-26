class Carousel {
  constructor(carouselElement, options = {}) {
    this.carousel = carouselElement;
    this.carouselInner = this.carousel.querySelector(".carousel-inner");
    this.items = this.carousel.querySelectorAll(".carousel-item");
    this.prevBtn = this.carousel.querySelector(".carousel-control.left");
    this.nextBtn = this.carousel.querySelector(".carousel-control.right");
    this.currentIndex = 0;
    this.totalItems = this.items.length;
    this.autoPlay = options.autoPlay || false;
    this.intervalTime = options.intervalTime || 3000;
    this.timer = null;

    this.init();
  }

  init() {
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());
    window.addEventListener("resize", () => this.updateCarousel());
    if (this.autoPlay) this.startAutoPlay();
  }

  updateCarousel() {
    const width = this.carouselInner.clientWidth;
    this.carouselInner.style.transform = `translateX(-${
      this.currentIndex * width
    }px)`;
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

document.querySelectorAll(".carousel").forEach((carouselEl, index) => {
  new Carousel(carouselEl, {
    autoPlay: index === 0, // First carousel autoplay true, second false
    intervalTime: index === 0 ? 5000 : 4000,
  });
});
