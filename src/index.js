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
  getToys().then(function(toys) {
    toys.forEach(function(character){
      renderToy(character);
    })
  })

  // fetch object containing toy information
  function getToys() {
    return fetch(TOYS_API)
      .then(function(response){
        return response.json();
      })
  }

  // render character
  function renderToy(character) {
    let toyName = document.createElement("h2");
    toyName.innerText = character.name;

    let toyImg = document.createElement("img");
    toyImg.setAttribute("class", "toy-avatar");
    toyImg.src = character.image;

    let toyLikes = document.createElement("p");
    toyLikes.innerText = `${character.likes} Like(s)`;

    let likeBtn = document.createElement("button");
    likeBtn.setAttribute("class", "like-btn");
    likeBtn.setAttribute("id", `${character.id}`);
    likeBtn.innerText = "Like ♡";

    likeBtn.addEventListener('click', function(event) {
      handleLikes(event);
    })

    let toyDiv = document.createElement("div");
    toyDiv.setAttribute("class", "card");
    toyDiv.append(toyName, toyImg, toyLikes, likeBtn)
    
    toyCollection.append(toyDiv);
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
      .then(function(character) {
        renderToy(character);
      })
  }

  // post new likes
  function handleLikes(event) {
    event.preventDefault();

    let newLikeNum = parseInt(event.target.previousElementSibling.innerText) + 1;
  
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": newLikeNum
      })
    }

    fetch(`${API_ENDPOINT}/toys/${event.target.id}`, configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function() {
        event.target.previousElementSibling.innerText = `${newLikeNum} Like(s)`;
      })
  }

})