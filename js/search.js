import { exercises } from "../js/data.js";
import { renderCards } from "../js/card.js";
const searchInput = document.querySelector(".search_input_wrapper");
const cardWrap = document.querySelector(".card_wrap");
const autocompleteList = document.querySelector(".autocomplete_list");

// (카드 생성 함수)
// function createExerciseCard(item) {
//   const card = document.createElement("div");
//   card.className = "exercise_card";
//   card.innerHTML = `
//   <img src="${item.thumbnail}" alt="${item.name}" />
//   `;
//   return card;
// }

// 검색 결과 보여주는 함수
function showSearchResult(keyword) {
  const matchedExercises = exercises.filter((item) =>
    item.name.includes(keyword)
  );

  cardWrap.innerHTML = "";

  if (matchedExercises.length > 0) {
    // renderCards(container, items, startIndex, count)
    renderCards(cardWrap, matchedExercises, 0, matchedExercises.length);
  } else {
    cardWrap.innerHTML = `<li class="no_data">해당 이름을 가진 운동을 찾을 수 없어요 😓</li>`;
  }
}

// 운동리스트에서 검색이 포함된 항목만 필터링
function getMatchedExercises(keyword) {
  return exercises.filter((item) => item.name.includes(keyword));
}

// handleSearchInput 함수
function handleSearchInput() {
  const inputValue = searchInput.value.trim();
  cardWrap.innerHTML = "";
  autocompleteList.innerHTML = "";

  if (!inputValue) {
    return;
  }

  const matchedExercises = getMatchedExercises(inputValue);

  // 입력 추천 자동 검색어..?
  if (matchedExercises.length > 0) {
    autocompleteList.style.display = "block"; //  리스트 보이기
    matchedExercises.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = getHighlightedText(item.name, inputValue);
      li.addEventListener("click", () => {
        searchInput.value = item.name;
        autocompleteList.innerHTML = "";
        autocompleteList.style.display = "none"; // 클릭 후 리스트 숨김
        showSearchResult(item.name);
      });
      autocompleteList.appendChild(li);
    });
  } else {
    autocompleteList.style.display = "none"; // 검색어는 있는데 추천이 없으면 숨김
  }

  showSearchResult(inputValue);
}

// 입력값과 일치하는 부분에 하이라이트를 적용
function getHighlightedText(text, keyword) {
  const regex = new RegExp(`(${keyword})`);
  return text.replace(regex, `<span class="highlight">$1</span>`);
}

searchInput.addEventListener("input", handleSearchInput);

//input 외 영역 클릭 시 리스트 안보이게
document.addEventListener("click", (e) => {
  const isClickInsideInput = searchInput.contains(e.target);
  const isClickInsideList = autocompleteList.contains(e.target);

  if (!isClickInsideInput && !isClickInsideList) {
    autocompleteList.style.display = "none";
  }
});
