import { renderExercisePopup } from "./popup.js"

const moreBtn = document.querySelector('.more_btn');
const cardWrap = document.querySelector('.card_wrap');

const cardHTML = `
  <li class="card_contents">
	  <img src="./assets/images/barbellSquat.png" alt="바벨스쿼트" />
		<span class="ex_name">바벨 스쿼트</span>					
    <img class="like" src="./assets/images/heart.svg" alt="좋아요 버튼" />
	  <button class="view_detail_btn" type="button">상세 보기</button>
	</li>
`;

function handleLikeClick() {
  let heart = false;

  return (e) => {
    const target = e.currentTarget;
    const emptySrc = './assets/images/heart.svg';
    const fillSrc = './assets/images/fillheart.svg';

    if (!heart) {
      target.src = fillSrc;
    } else {
      target.src = emptySrc;
    }
    heart = !heart;
  };
}

function LikeEvents() {
  const likes = document.querySelectorAll('.like');

  likes.forEach(el => {
    el.addEventListener('click', handleLikeClick());
  });
}

function DetailEvents() {
  const detailButtons = document.querySelectorAll('.view_detail_btn');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', handleDetailButtonClick);
  });
}

function handleDetailButtonClick() {
  renderExercisePopup();
}

function handleMoreButtonClick() {
  for (let i = 0; i < 3; i++) {
    cardWrap.insertAdjacentHTML('beforeend', cardHTML);
  }
  LikeEvents();
  DetailEvents();
  moreBtn.style.display = 'none';
}

LikeEvents();
DetailEvents();
moreBtn.addEventListener('click', handleMoreButtonClick);