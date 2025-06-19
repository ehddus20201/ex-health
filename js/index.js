import { exercises } from "../js/data.js";

const searchInput = document.querySelector(".search_input_wrapper");
const cardContainer = document.querySelector(".card_container");
const autocompleteList = document.querySelector(".autocomplete_list");
const searchResultTitle = document.querySelector(".search_result_title");

// (카드 생성 함수)
function createExerciseCard(item) {
  const card = document.createElement("div");
  card.className = "exercise_card";
  card.innerHTML = `
  <img src="${item.thumbnail}" alt="${item.name}" />
  `;
  return card;
}

// 검색 결과 보여주는 함수
function showSearchResult(keyword) {
  const matchedExercises = exercises.filter((item) =>
    item.name.includes(keyword)
  );

  cardContainer.innerHTML = "";

  if (matchedExercises.length > 0) {
    matchedExercises.forEach((item) => {
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
  return exercises.filter((item) => item.name.includes(keyword));
}

// handleSearchInput 함수
function handleSearchInput() {
  const inputValue = searchInput.value.trim();
  cardContainer.innerHTML = "";
  autocompleteList.innerHTML = "";

  if (!inputValue) {
    searchResultTitle.style.display = "none";

    return;
  }
  searchResultTitle.style.display = "block";
  const matchedExercises = getMatchedExercises(inputValue);

  // 입력 추천 자동 검색어..?
  matchedExercises.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = getHighlightedText(item.name, inputValue);
    li.addEventListener("click", () => {
      searchInput.value = item.name;
      autocompleteList.innerHTML = "";
      showSearchResult(item.name);
    });
    autocompleteList.appendChild(li);
  });

  showSearchResult(inputValue);
}

// 입력값과 일치하는 부분에 하이라이트를 적용
function getHighlightedText(text, keyword) {
  const regex = new RegExp(`(${keyword})`);
  return text.replace(regex, `<span class="highlight">$1</span>`);
}

searchInput.addEventListener("input", handleSearchInput);
