let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{

  // declare variables
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const toyCollection = document.querySelector('#toy-collection');

  // URLs
  const API_ENDPOINT = "http://localhost:3000";
  const TOYS_API = `${API_ENDPOINT}/toys`;

  // 
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
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
      let toyDiv = document.createElement("div");
      let toyName = document.createElement("h2");
      let toyImg = document.createElement("img");
      let toyLikes = document.createElement("p");
      let likeBtn = document.createElement("button");
      
      toyDiv.setAttribute("class", "card");
      toyImg.setAttribute("class", "toy-avatar");
      likeBtn.setAttribute("class", "like-btn");

      toyName.innerText = character.name;
      toyImg.src = character.image;
      toyLikes.innerText = `${character.likes} Like(s)`;
      likeBtn.innerText = "Like ♡";
      
      toyDiv.appendChild(toyName);
      toyDiv.appendChild(toyImg);
      toyDiv.appendChild(toyLikes);
      toyDiv.appendChild(likeBtn);
      toyCollection.appendChild(toyDiv);
    })
  }





})
