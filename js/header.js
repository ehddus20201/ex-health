const track = document.querySelector('.slider_track');
const slides = document.querySelectorAll('.slider_track img');
const slideWidth = 283;
let index = 0;


// 반응형추가
function getSlideWidth() {
  return slides[0].clientWidth; // 현재 보여지는 슬라이드 너비
}

function moveSlide() {
  index++;
  const slideWidth = getSlideWidth();
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${slideWidth * index}px)`;

  if (index >= slides.length - 3) {
    setTimeout(() => {
      track.style.transition = 'none';
      index = 0;
      track.style.transform = `translateX(0px)`;
    }, 500);
  }
}


setInterval(moveSlide, 3000);


const header = document.querySelector('.main_header');
let lastScroll = 0;

// 스크롤 시 헤더 숨기기 또는 보이기
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // 아래로 스크롤 중
    header.classList.add('hidden');
  } else {
    // 위로 스크롤 중
    header.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});

// 마우스가 상단에 닿으면 헤더 다시 보이기
document.addEventListener('mousemove', (e) => {
  if (e.clientY <= 20) {
    header.classList.remove('hidden');
  }
});

//햄부기 버튼 클릭시 네비바열기
const menuToggleBtn = document.querySelector('.menu_toggle_btn');
const mobileMenu = document.querySelector('.mobile_nav_menu');

menuToggleBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

const mobileLinks = document.querySelectorAll('.mobile_nav_menu a, .mobile_nav_menu button');

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

const closeMenuBtn = document.querySelector('.close_menu_btn');

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});
