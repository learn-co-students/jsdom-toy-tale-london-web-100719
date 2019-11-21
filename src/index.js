document.addEventListener("DOMContentLoaded", ()=>{
  
  // variables
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  let addToy = false
  let toyCollection = document.querySelector('#toy-collection');

  // URLs
  const API_ENDPOINT = "http://localhost:3000";
  const TOYS_API = `${API_ENDPOINT}/toys`;

  // hide or reveal form for creating a new toy
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block';
      addBtn.innerHTML = "Hide form";
      
      // handle adding toy when button is clicked
      toyForm.addEventListener("submit", function(event) {
        event.preventDefault();
        postToyData(event.target);
      })

    } else {
      toyForm.style.display = 'none';
      addBtn.innerHTML = "Add a new toy!";
    }
  })

  // functions to run
  loadToys();

  // fetch object and render characters
  function loadToys() {
    return fetch(TOYS_API)
      .then(function(response){
        return response.json();
      })
      .then(function(toysJson){
        renderToys(toysJson);
      })
  }

  // render characters
  function renderToys(toysJson) {
    toysJson.forEach(function(character) {
      let toyName = document.createElement("h2");
      toyName.innerText = character.name;

      let toyImg = document.createElement("img");
      toyImg.setAttribute("class", "toy-avatar");
      toyImg.src = character.image;

      let toyLikes = document.createElement("p");
      toyLikes.innerText = `${character.likes} Like(s)`;

      let likeBtn = document.createElement("button");
      likeBtn.setAttribute("class", "like-btn");
      likeBtn.innerText = "Like ♡";

      let toyDiv = document.createElement("div");
      toyDiv.setAttribute("class", "card");
      toyDiv.append(toyName, toyImg, toyLikes, likeBtn)
      
      toyCollection.append(toyDiv);
    })
  }

  // post new toy character
  function postToyData(formData) {

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": formData.name.value,
        "image": formData.image.value,
        "likes": 0
      })
    }

    return fetch(TOYS_API, configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(toy) {
        renderToys(toy);
      })
  }

})
