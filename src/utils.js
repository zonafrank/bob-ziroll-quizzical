export const decodeHtmlEntities = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

export function shuffleArray(arr) {
  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
}

export function getCategories() {
  return {
    "Any Category": null,
    "General Knowledge": 9,
    "Entertainment: Books": 10,
    "Entertainment: Film": 11,
    "Entertainment: Music": 12,
    "Entertainment: Musicals & Theatres": 13,
    "Entertainment: Television": 14,
    "Entertainment: Video Games": 15,
    "Entertainment: Board Games": 16,
    "Science & Nature": 17,
    "Science: Computers": 18,
    "Science: Mathematics": 19,
    Mythology: 20,
    Sports: 21,
    Geography: 22,
    History: 23,
    Politics: 24,
    Art: 25,
    Celebrities: 26,
    Animals: 27,
    Vehicles: 28,
    "Entertainment: Comics": 29,
    "Science: Gadgets": 30,
    "Entertainment: Japanese Anime & Manga": 31,
    "Entertainment: Cartoon & Animations": 32
  };
}

export async function getQuestions(categoryId, abortController) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10${
      categoryId ? "&category=" + categoryId : ""
    }`,
    {
      signal: abortController?.signal
    }
  );
  return response;
}
