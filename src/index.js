let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.querySelector('#new-toy-btn');
    const toyForm = document.querySelector('.container');

    const toyCollection = document.querySelector('#toy-collection');
    const createNewToyButton = document.querySelector('.submit');

    addBtn.addEventListener('click', () => {

        // hide & seek with the form
        addToy = !addToy

        if (addToy) {

            toyForm.style.display = 'block'

        } else {

            toyForm.style.display = 'none'

        };

    });

    createNewToyButton.addEventListener('click', (event) => {

        event.preventDefault();
        const name = document.querySelector('input[name="name"]');
        const imageUrl = document.querySelector('input[name="image"]');

        addNewToyCard(name.value, imageUrl.value);

        name.value = "";
        imageUrl.value = "";

    });

    toyCollection.addEventListener('click', (event) => {

        const target = event.target;

        if (target.className === "like-btn") {

            likeToy(target.parentElement.id);

        }

    });

    createToyCards(toyCollection);

});

async function createToyCards(toyCollection) {

    let resArray = await fetch("http://localhost:3000/toys").then(res => res.json())

    for (element of resArray) {

        createCard(element, toyCollection);

    };

};

function createCard(element, toyCollection = document.querySelector('#toy-collection')) {

    let card = document.createElement('div');
    card.classList.add('card');
    card.id = element.id;

    let heading = document.createElement('h2');
    heading.textContent = element.name;

    let image = document.createElement('img');
    image.src = element.image;
    image.classList.add('toy-avatar');

    let likes = document.createElement('p');
    likes.textContent = element.likes + " Likes";

    let likeButton = document.createElement('button');
    likeButton.classList.add('like-btn');

    card.appendChild(heading);
    card.appendChild(image);
    card.appendChild(likes);
    card.appendChild(likeButton);

    toyCollection.appendChild(card);

};

async function addNewToyCard(name, imageUrl) {

    let formData = {

        name: name,
        image: await fetch(imageUrl).then(res => res.url),
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

    const res = await fetch("http://localhost:3000/toys", configObj);
    const element = await res.json();
    return createCard(element);

};

async function likeToy(elementID) {

    let toyToLike = await fetch(`http://localhost:3000/toys/${elementID}`).then(res => res.json())

    let configObj = {

        method: "PATCH",
        headers: {

            "Content-Type": "application/json",
            "Accept": "application/json"

        },
        body: JSON.stringify({likes: toyToLike.likes + 1})

    };

    const res = await fetch(`http://localhost:3000/toys/${elementID}`, configObj);
    const element = await res.json();
    return renderCard(element);

};

function renderCard(element) {

    const card = document.getElementById(`${element.id}`);
    const likes = card.getElementsByTagName('p')[0];
    likes.textContent = element.likes + " Likes";

}