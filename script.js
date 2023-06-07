const carousel = document.querySelector('.carousel');
const slides = carousel.querySelectorAll('.slide');
const prevBtn = carousel.querySelector('#prevBtn');
const nextBtn = carousel.querySelector('#nextBtn');

// mouse event
let isDown = false;
let startX;
let walk;
let walkT;
const moveOffset = 30;

let currentSlide = 0;

const slideData = [
  {
    image: 'https://picsum.photos/id/1018/1920/1080',
    title: 'Diapositiva 1',
    subtitle: 'Subtítulo 1',
    buttonText: 'Aprender más',
    buttonLink: '#',
  },
  {
    image: 'https://picsum.photos/id/1015/1920/1080',
    title: 'Diapositiva 2',
    subtitle: 'Subtítulo 2',
    buttonText: 'Explorar',
    buttonLink: '#',
  },
  {
    image: 'https://picsum.photos/id/1016/1920/1080',
    title: 'Diapositiva 3',
    subtitle: 'Subtítulo 3',
    buttonText: 'Comprar ahora',
    buttonLink: '#',
  },
];

// slider
function showSlide(n) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');

  const slide = slideData[currentSlide];
  const slideElement = slides[currentSlide];

  slideElement.style.backgroundImage = `url(${slide.image})`;
  slideElement.querySelector('h1').textContent = slide.title;
  slideElement.querySelector('h2').textContent = slide.subtitle;
  slideElement.querySelector('button').textContent = slide.buttonText;
  slideElement.querySelector('button').href = slide.buttonLink;
}

function moveSlideLogic(walkVAR, moveOffsetVAR) {
  if (walkVAR < moveOffsetVAR && walkVAR > -moveOffsetVAR) return;
  if (walkVAR > moveOffsetVAR) showSlide(currentSlide - 1)
  if (walkVAR < -moveOffsetVAR) showSlide(currentSlide + 1);
}


prevBtn.addEventListener('click', () => {
  showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
  showSlide(currentSlide + 1);
});

// mouse event
carousel.addEventListener("mousedown", e => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  e.preventDefault();
});

carousel.addEventListener("mouseleave", () => {
  isDown = false;
  moveSlideLogic(walk, moveOffset);
});

carousel.addEventListener("mouseup", () => {
  isDown = false;
  moveSlideLogic(walk, moveOffset);
});

carousel.addEventListener("mousemove", e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  walk = x - startX;
});

// touch event
carousel.addEventListener("touchstart", e => {
  isDown = true;
  startX = e.touches[0].pageX - carousel.offsetLeft;
});

carousel.addEventListener("touchend", () => {
  isDown = false;
  moveSlideLogic(walkT, moveOffset);
});

carousel.addEventListener("touchcancel", () => {
  isDown = false;
  moveSlideLogic(walkT, moveOffset);
});

carousel.addEventListener("touchmove", e => {
  if (!isDown) return;
  const x = e.touches[0].pageX - carousel.offsetLeft;
  walkT = x - startX;
  e.preventDefault();
});

// slide with key
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") {
    showSlide(currentSlide + 1);
  } else if (e.key === "ArrowLeft") {
    showSlide(currentSlide - 1);
  }
});

showSlide(currentSlide);

