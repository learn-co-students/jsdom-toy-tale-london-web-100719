document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyDiv = document.querySelector("#toy-collection");
  let addToy = false;

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(json => {
      json.forEach(toy => buildToyCard(toy));
    });

  // come back and clean?
  function buildToyCard(toy) {
    let toyCard = document.createElement("div");
    toyCard.className = "card";

    let toyName = document.createElement("h2");
    toyName.innerText = toy.name;

    let toyImg = document.createElement("img");
    toyImg.src = toy.image;
    toyImg.className = "toy-avatar";

    let toyLikes = document.createElement("p");
    toyLikes.innerText = toy.likes;

    let toyBtn = document.createElement("btn");
    toyBtn.className = "like-btn";
    toyBtn.innerText = "Like";
    toyBtn.addEventListener("click", function() {
      likeToy(toy.id, toyLikes);
    });

    toyCard.append(toyName, toyImg, toyLikes, toyBtn);
    toyDiv.append(toyCard);
  } // buildToyCard

  const toyFormBtn = document.querySelector(".submit");
  toyFormBtn.addEventListener("click", submitToy);

  function submitToy(event) {
    event.preventDefault(); // prevent page reload from form submission

    let toyFormName = document.querySelector("input[name=name]").value;
    let toyFormImg = document.querySelector("input[name=image]").value;
    let toyInfo = {
      name: toyFormName,
      image: toyFormImg,
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

    fetch("http://localhost:3000/toys", newToy).then(buildToyCard(toyInfo));
  } // submitToy

  function likeToy(id, toyLikes) {
    let url = `http://localhost:3000/toys/${id}`;
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
      .then(res => res.json())
      .then(json => (toyLikes.innerText = json.likes));
  }
});