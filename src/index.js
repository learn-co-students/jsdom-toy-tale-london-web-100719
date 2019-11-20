let addToy = false

const toyCollection = document.getElementById("toy-collection")
const inputs = document.querySelectorAll("input")
const randomID = Math.floor(Math.random() * 10000)


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  loadToy()
  newToyListener()
  
})

const fetchToy = () => fetch("http://localhost:3000/toys")
  .then(resp => resp.json())

function loadToy(){
  fetchToy()
  .then(toyData => renderToy(toyData))
}

function renderToy(toyData){
  toyData.forEach (toy => appendToy(toy))
}

function appendToy(toy){

  let div = document.createElement("div")
  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  let p = document.createElement("p")
  let button = document.createElement("button")
  
  div.className = "card"
  h2.innerText = toy["name"]
  img.src = toy["image"]
  img.className = "toy-avatar"
  p.innerText = `${toy["likes"]} Likes`
  button.className = "like-btn"
  button.innerText = "Like"
  button.addEventListener('click', addLike)
  
  toyCollection.appendChild(div)
  div.append(h2, img, p, button)
  }


function addLike(event){
  event.preventDefault()
  const likeElement = event.target.previousElementSibling
  const addAnotherLike = parseInt(likeElement.textContent , 10) + 1

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
        likes: addAnotherLike
    })
  };

  fetch( `http://localhost:3000/toys/${likeElement.id}`, configObj)
    .then(resp => resp.json())
    .then(toyId => likeElement.innerText = `${addAnotherLike} Likes`)
    .catch(error => {
      document.body.innerHTML = error.message
      console.log(error.message)
    })
}
   


function newToyListener(){
  const newToyButton = document.querySelector("input[type=submit]")

  newToyButton.addEventListener('click', (event) =>{
    event.preventDefault()

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
        name: inputs[0].value,
        image: inputs[1].value
    })
  };

  fetch( "http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(appendToy)
    .catch(error => {
      document.body.innerHTML = error.message
      console.log(error.message)
    })
  })
}