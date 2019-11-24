let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const form = document.querySelector("form")
  
  form.addEventListener("submit", addNewToy)

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  
  controller()

})

function controller() {
  getDomCardBox()
  renderCard()
}

function getDomCardBox() {
  const toyBox = document.querySelector("#toy-collection")
  return toyBox
}

function renderCard() {
  getFromAPI().then(array => array.forEach(el => {
    let newDiv = document.createElement("div")
    newDiv.classList.add("card")
    getDomCardBox().appendChild(newDiv)

    cardInfo = `<h2>${el.name}</h2><img src=${el.image} class="toy-avatar" /><p>${el.likes} Likes</p><button class="like-btn" id=${el.id}>Like </button>`
    newDiv.innerHTML = cardInfo
    newDiv.lastElementChild.addEventListener('click', patchToy)
    
  }))
}

function getFromAPI() {
  const cardUrl = 'http://localhost:3000/toys'
  return fetch(cardUrl)
  .then(resp => resp.json())
}

function addNewToy() {

  const newUrl = 'http://localhost:3000/toys'
  const formName = document.querySelector("input[name=name]").value
  const formImage = document.querySelector("input[name=image]").value
  const bodyContent = {
    "name": `${formName}`, 
    "image": `${formImage}`,
    "likes": 0
  }

  const configObj = {
    method: "POST",
    headers: {
      "content-Type": 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(bodyContent)
  }

  fetch(newUrl, configObj)
}

function patchToy() {

  const patchUrl = `http://localhost:3000/toys/${event.target.id}`
  let button = event.target
  let newNumber = parseInt(event.target.parentElement.children[2].innerText.split(" ")[0]) + 1 

  const bodyContent = {
    "likes": newNumber
  }

  const configObj = {
    method: "PATCH",
    headers: {
      "content-Type": 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(bodyContent)
  }
  
  fetch(patchUrl, configObj)
  .then(() => {
    button.parentElement.children[2].innerText = `${newNumber} Likes`
  })

}