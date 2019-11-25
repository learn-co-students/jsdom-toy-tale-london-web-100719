let addToy = false

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

})

const div = document.getElementById("toy-collection");

fetch('http://localhost:3000/toys')
.then(function(response) {
  return response.json();
})
.then(function(json) {
  return renderDOM(json) 
});

function renderToy (toy) {
  const div = document.createElement("div");
  div.classList.add("card");
 const h2 = document.createElement("h2");
 h2.innerText = toy.name;
 const img = document.createElement("img");
 img.src = toy.image;
 img.classList.add("toy-avatar");
 const paragraph = document.createElement("p");
 paragraph.innerText = toy.likes;
 // paragraph.id = toy.id;
 const button = document.createElement("button");
 button.textContent = "Like"
 button.classList.add("like-btn");
 button.id = toy.id 
 button.addEventListener("click", function(event){
  event.preventDefault;
  let likeNumber = parseInt(paragraph.innerText, 10) 
  likeNumber += 1;  
  paragraph.innerText = likeNumber;

  let formData = {
    likes: likeNumber,
  };
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object){
    console.log(object)
  });
})






 div.appendChild(h2);
 div.appendChild(img);
 div.appendChild(paragraph);
 div.appendChild(button);
 document.body.appendChild(div);
}

function renderDOM (result) {
  console.log(result);
  result.forEach(toy => renderToy (toy) )
}

const createToyButton = document.querySelector(".add-toy-form");
createToyButton.addEventListener("submit", function(event){
  event.preventDefault();
  const inputName = document.querySelector('input[name = "name"]').value;
  const inputImage = document.querySelector('input[name = "image"]').value;
  let formData = {
    name: inputName,
    image: inputImage
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object){
    renderToy(object);
  });
})



//likeButton.addEventListener("click", function() {
  // console.log(likeButton.parentElement)
//})

document.addEventListener("DOMContentLoaded", function(){
  const likeButton = document.querySelector(".like-btn");
  console.log(likeButton)
})