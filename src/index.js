let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  
  fetchToys();

  function fetchToys() {
    return fetch("http://localhost:3000/toys")  
      .then(resp => resp.json())
      .then(json => renderToys(json))
  }
  
  function renderToys(json) {
      json.forEach(toy => { 
        createToy(toy);
      });
  }

  function createToy(toy) {
    const toyCollection = document.getElementById('toy-collection')
    const div = document.createElement('div');
    toyCollection.append(div);
    div.innerHTML =
      `<div class="card">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      </div>`;
    
    div.querySelector('.like-btn').addEventListener("click", function(e) {
      let newLikes = Number(toy.likes) + 1;
      toy.likes = newLikes
      e.target.previousElementSibling.innerText = `${toy.likes} Likes`;
      console.log(newLikes);
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
          },
        body: JSON.stringify(
          {
          likes: newLikes
          }
        )
      })
    })
  }
  
  const addBtn = document.querySelector('#new-toy-btn')
  const toyFormContainer = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = 'block'
    } else {
      toyFormContainer.style.display = 'none'
    }
  })
  
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let toyName = toyForm.elements.name.value
    let toyImage = toyForm.elements.image.value
    
    toyForm.elements.name.value = ""
    toyForm.elements.image.value = ""

    let formData = {
      name: toyName,
      image: toyImage,
      likes: 0
    }
  
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    } 

    fetch('http://localhost:3000/toys', configObj)
      .then( resp => resp.json() )
      .then( createToy )
  })
  
})
