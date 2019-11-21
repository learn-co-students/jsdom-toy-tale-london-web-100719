let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  const toyFormMessage = document.querySelector('#form-message');
  const toyCollection = document.querySelector("#toy-collection");

  addBtn.addEventListener('click', handleFormToggle);
  toyForm.addEventListener('submit', handleFormSubmit);

  const API_ENDPOINT = "http://localhost:3000";
  const TOYS_URL = `${API_ENDPOINT}/toys`

  const jsonify = res => res.json();

  loadToys()

  function loadToys() {
    fetch(TOYS_URL).then(jsonify)
    .then(toys => {
      toys.forEach(renderToy);
    })
  }

  function handleFormToggle() {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      addBtn.textContent = "Don't add a new toy :("
    } else {
      toyForm.style.display = 'none'
      addBtn.textContent = "Add a new toy!"
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const newToy = {
      name: event.target.elements.name.value,
      image: event.target.elements.image.value,
      likes: 0
    }

    sendDataToAPI(TOYS_URL, newToy, "POST").then(jsonify)
    .then(toy => {
      renderToy(toy);
      makeFormChanges();
    })
  }

  function sendDataToAPI(url, data, method) {
    let configObj = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    };
    return fetch(url, configObj);
  }

  function removeDataFromAPI(url){
    return fetch(url, {method: "DELETE" } )
  }

  function renderToy(toy){

      const cardEl = document.createElement("div");
      cardEl.classList.add("card");

      const nameEl = document.createElement("h2");
      nameEl.textContent = toy.name;
      nameEl.id = toy.id;

      const imgEl = document.createElement("img");
      imgEl.src = toy.image;
      imgEl.classList.add("toy-avatar");

      const likesEl = document.createElement("p");
      likesEl.textContent = `${toy.likes} Likes`;
      likesEl.classList.add("like-counter");

      const likeButtonEl = document.createElement("button");
      likeButtonEl.textContent = "Like <3";
      likeButtonEl.classList.add("like-btn");
      likeButtonEl.addEventListener('click', handleLikeClick);

      const deleteButtonEl = document.createElement("button");
      deleteButtonEl.textContent = "X";
      deleteButtonEl.classList.add("delete-btn");
      deleteButtonEl.addEventListener('click', handleDeleteClick);
      
      cardEl.append(nameEl, imgEl, likesEl, likeButtonEl, deleteButtonEl)

      toyCollection.appendChild(cardEl);
  }

  function makeFormChanges(){
    toyForm.querySelector("input[name=name]").value = ""
    toyForm.querySelector("input[name=image]").value = ""
    toyFormMessage.textContent = "Toy Successfully added (check the bottom of the page!)";
  }

  function handleDeleteClick(event) {
    const deleteButton = event.target;
    const id = parseInt(deleteButton.parentNode.querySelector("h2").id);
    const card = deleteButton.parentNode;
    card.remove();

    removeDataFromAPI(`${TOYS_URL}/${id}`)
  }

  function handleLikeClick(event) {
    const likeButton = event.target;
    const id = parseInt(likeButton.parentNode.querySelector("h2").id);
    const likeCounter = likeButton.parentNode.querySelector(".like-counter");
    const newLikeNum = parseInt(likeCounter.textContent.split(" ")[0]) +1;

    const newLike = {
      id: id,
      likes: newLikeNum
    }

    sendDataToAPI(`${TOYS_URL}/${id}`, newLike, "PATCH").then(jsonify)
    .then(toyData => {
      incrementLike(toyData);
    })

    function incrementLike(toyData) {
      likeCounter.textContent = `${toyData.likes} Likes`;
    }
  }

})