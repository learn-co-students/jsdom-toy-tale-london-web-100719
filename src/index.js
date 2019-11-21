const jsonify = response => response.json();
const TOY_URL = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const newToyBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector("form");
  toyForm.addEventListener("submit", submitToy);
  const toyDiv = document.querySelector("#toy-collection");

  // New Toy Form
  let addToy = false;

  newToyBtn.addEventListener("click", newToyFormToggle);

  function newToyFormToggle() {
    addToy = !addToy;
    addToy
      ? (toyFormContainer.style.display = "block")
      : (toyFormContainer.style.display = "none");
  }

  // Display Current Toys
  fetch(TOY_URL)
    .then(jsonify)
    .then(json => {
      json.forEach(toy => buildToyCard(toy));
    });

  // 'Builds' Toy Cards
  function buildToyCard(toy) {
    let toyCard = document.createElement("div");
    toyCard.className = "card";

    let toyDel = document.createElement("p");
    toyDel.innerText = "❌";
    toyDel.addEventListener("click", () => {
      deleteToy(toy.id);
    });

    let toyName = document.createElement("h2");
    toyName.innerText = toy.name;

    let toyImg = document.createElement("img");
    toyImg.src = toy.image;
    toyImg.className = "toy-avatar";

    let toyLikes = document.createElement("p");
    toyLikes.innerText = toy.likes;

    let toyBtn = document.createElement("button");
    toyBtn.className = "like-btn";
    toyBtn.innerText = "Like 😍";
    toyBtn.addEventListener("click", () => {
      likeToy(toy.id, toyLikes);
    });

    toyCard.append(toyDel, toyName, toyImg, toyLikes, toyBtn);
    toyDiv.append(toyCard);
  } // buildToyCard

  function submitToy(event) {
    event.preventDefault(); // prevent page reload from form submission

    let toyInfo = {
      name: toyForm.name.value,
      image: toyForm.image.value,
      likes: 0
    };

    let newToy = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyInfo)
    };

    fetch(TOY_URL, newToy).then(buildToyCard(toyInfo));
  } // submitToy

  function likeToy(id, toyLikes) {
    let url = TOY_URL + `/${id}`;
    let likes = parseInt(toyLikes.innerText);
    likes++;

    let updateToy = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: likes
      })
    };

    fetch(url, updateToy)
      .then(jsonify)
      .then(json => (toyLikes.innerText = json.likes));
  }

  function deleteToy(id) {
    let url = TOY_URL + `/${id}`;
    let delToy = {
      method: "DELETE"
    };
    fetch(url, delToy)
      .then(jsonify)
      .then(event.target.parentNode.remove());
  }
});
