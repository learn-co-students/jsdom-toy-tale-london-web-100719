let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  fetchToys()
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const createButton = document.querySelector("input[type=submit]")
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  createButton.addEventListener("click", function(event) {
    event.preventDefault()
    newToy()
  })
  

})

function newToy() {
  let newName = document.querySelector("input[name=name]").value
  let newImage = document.querySelector("input[name=image]").value
  fetch("http://localhost:3001/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: newName,
      image: newImage,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(json => addAToy({name: newName, image: newImage, likes: 0}))
}

function fetchToys() {
  fetch("http://localhost:3001/toys")
  .then(resp => resp.json())
  .then(json => {
    json.forEach(toy => addAToy(toy))
    let toyCards = document.querySelectorAll('.card')
    toyCards.forEach(toyCard => likeIt(toyCard))
  })

}

function addAToy(toy) {
  let toyCollectionEl = document.querySelector('#toy-collection')

  let toyEl = document.createElement('div')
  toyEl.className = "card"
  toyCollectionEl.appendChild(toyEl)

  let header = document.createElement('h2')
  header.innerText = toy.name
  toyEl.appendChild(header)

  let image = document.createElement('img')
  image.src = toy.image
  image.className = "toy-avatar"
  toyEl.appendChild(image)

  let para = document.createElement('p')
  para.innerText = toy.likes
  toyEl.appendChild(para)

  let button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "Like <3"
  toyEl.appendChild(button)

}

function likeIt(toyCard) {
  let toyLikeButton = toyCard.querySelector('.like-btn')
  toyLikeButton.addEventListener("click", function() {
    let toyLikeCount = toyCard.querySelector('p')
    toyLikeCount.innerText ++ 
  })
}

