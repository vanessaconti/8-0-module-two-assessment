const filmSelections = document.querySelector("#select-film");
const description = document.querySelector("#description");
const filmDate = document.querySelector("#year");
const opinions = document.querySelector("ul");
const filmTitle = document.querySelector("#title-film");

fetch(`https://ghibliapi.herokuapp.com/films`)
  .then((response) => response.json())
  .then((films) => {
    films.forEach((film) => {
      const option = document.createElement("option");
      option.value = film.title;
      option.textContent = film.title;
      filmSelections.append(option);
    });

    filmSelections.addEventListener("change", (event) => {
      event.preventDefault();
      filmTitle.textContent = event.target.value;
      for (let film of films) {
        if (event.target.value === film.title) {
          description.textContent = film.description;
          filmDate.textContent = film.release_date;
        }
      }
    });

    document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      const reviewText = document.querySelector("#review-text");
      strong.textContent = filmTitle.textContent + ":" + " ";
      li.textContent = reviewText.value;
      li.prepend(strong);
      opinions.append(li);
      reviewText.value = "";
    });
  });
