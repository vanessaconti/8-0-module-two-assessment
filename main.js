const selector = document.querySelector("#select-film");
fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((obj) => {
    obj.forEach((film) => {
      const option = document.createElement("option");
      option.value = film.title;
      option.textContent = film.title;
      selector.append(option);
    });

    selector.addEventListener("change", (event) => {
      event.preventDefault();
      const filmInfo = document.querySelector("#display-info");
      obj.forEach((film) => {
        if (film.title === event.target.value) {
          filmInfo.innerHTML = `
                <h3>${film.title}</h3>
                <p>${film.release_date}</p>
                <p>${film.description}</p>`;
        }
      });
    });

    document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      li.innerHTML = `<strong><b>${selector.value}</b></strong>: ${event.target.review.value}`;
      ul.append(li);
      event.target.reset();
    });
  });
