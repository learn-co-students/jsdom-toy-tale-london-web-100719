let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyFormName = document.querySelector('input[name="name"]');
  const toyFormImageUrl = document.querySelector('input[name="image"]');
  const toyFormMessage = document.querySelector('#form-message');
  const toyCollection = document.querySelector("#toy-collection");

  loadToys()

  addBtn.addEventListener('click', handleFormToggle);
  toyForm.addEventListener('submit', submitFormAndRender);

  function loadToys() {
    toys_url = "http://localhost:3000/toys"
    fetch(toys_url).then(res => res.json())
    .then(toys => {
      appendToyItemToPage(toys)
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

  function submitFormAndRender(event) {
    event.preventDefault();
    const name = toyFormName.value;
    const image = toyFormImageUrl.value;
    const url = "http://localhost:3000/toys";

    let formData = {
      name: name,
      image: image,
      likes: 0
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(url, configObj).then(res => res.json())
    .then(toys => {
      appendToyItemToPage([toys]);
      makeFormChanges()
    })
    .catch(error => {
        console.log(error);
    });
  }


  function appendToyItemToPage(toys){
    for (const toy in toys){
      const cardEl = document.createElement("div");
      cardEl.classList.add("card");

      const nameEl = document.createElement("h2");
      nameEl.textContent = toys[toy].name;
      nameEl.id = toys[toy].id;

      const imgEl = document.createElement("img");
      imgEl.src = toys[toy].image;
      imgEl.classList.add("toy-avatar");

      const likesEl = document.createElement("p");
      likesEl.textContent = `${toys[toy].likes} Likes`;
      likesEl.classList.add("like-counter");

      const likeButtonEl = document.createElement("button");
      likeButtonEl.textContent = "Like <3";
      likeButtonEl.classList.add("like-btn");
      likeButtonEl.addEventListener('click', handleLikeClick);
      
      cardEl.append(nameEl, imgEl, likesEl, likeButtonEl)

      toyCollection.appendChild(cardEl);
    }
  }

  function makeFormChanges(){
    toyFormName.value = "";
    toyFormImageUrl.value = "";
    toyFormMessage.textContent = "Toy Successfully added (check the bottom of the page!)";
  }

  function handleLikeClick(event) {
    const likeButton = event.target;
    const id = parseInt(likeButton.parentNode.querySelector("h2").id);
    const likeCounter = likeButton.parentNode.querySelector(".like-counter");
    const newLikeNum = parseInt(likeCounter.textContent.split(" ")[0]) +1;

    url = `http://localhost:3000/toys/${id}`

    let formData = {
      id: id,
      likes: newLikeNum
    };

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch(url, configObj).then(res => res.json())
    .then(toyData => {
      incrementLike(toyData);
    })
    .catch(error => {
        console.log(error);
    });

    function incrementLike(toyData) {
      likeCounter.textContent = `${toyData.likes} Likes`;
    }
  }

})