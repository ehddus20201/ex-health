import { exercises } from "./data.js";

const searchInput = document.querySelector(".search_input_wrapper");
const cardContainer = document.querySelector(".card_container");
const autocompleteList = document.querySelector(".autocomplete_list");
const searchResultTitle = document.querySelector(".search_result_title");

// (카드 생성 함수)
function createExerciseCard({ thumbnail, name }) {
  const card = document.createElement("div");
  card.className = "exercise_card";
  card.innerHTML = `
  <img src="${thumbnail}" alt="${name}" />
  `;
  return card;
}

// 검색 결과 보여주는 함수
function showSearchResult(keyword) {
  const matched = getMatchedExercises(keyword);

  cardContainer.innerHTML = "";

  if (matched.length > 0) {
    matched.forEach((item) => {
      const card = createExerciseCard(item);
      cardContainer.appendChild(card);
    });
  } else {
    cardContainer.innerHTML = `<p>해당 이름을 가진 운동을 찾을 수 없어요 😓</p>`;
    // searchResultTitle.style.display = "none";
  }
}

// 운동리스트에서 검색이 포함된 항목만 필터링
function getMatchedExercises(keyword) {
  return exercises.filter(({ name }) => name.includes(keyword));
}

// 입력값과 일치하는 부분에 글자 강조
function getHighlightedText(text, keyword) {
  const regex = new RegExp(`(${keyword})`);
  return text.replace(regex, `<span class="highlight">$1</span>`);
}

// handleSearchInput 함수
function handleSearchInput() {
  const keyword = searchInput.value.trim();
  cardContainer.innerHTML = "";
  autocompleteList.innerHTML = "";

  if (!keyword) {
    searchResultTitle.style.display = "none";
    return;
  }
  searchResultTitle.style.display = "block";
  const matched = getMatchedExercises(keyword);

  // 입력 추천 자동 검색어..?
  matched.forEach(({ name }) => {
    const li = document.createElement("li");
    li.innerHTML = getHighlightedText(name, keyword);
    li.addEventListener("click", () => {
      searchInput.value = name;
      autocompleteList.innerHTML = "";
      showSearchResult(name);
    });
    autocompleteList.appendChild(li);
  });

  showSearchResult(keyword);
}

searchInput.addEventListener("input", handleSearchInput);
