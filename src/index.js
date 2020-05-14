let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container"); 
  const newToyForm = document.querySelector('form.add-toy-form');
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  const getToys = () => {
  	  document.getElementById('toy-collection').innerHTML = '';

  	  fetch('http://localhost:3000/toys')
		.then( res => res.json() )
		.then( json => populateToys(json) )
		.catch( err => err.message )
  };

  getToys();

	// Create event listner for submit
	newToyForm.addEventListener('submit', event => {
		event.preventDefault();
		const form = event.target;
		const data = {
			name: form.name.value,
			image: form.image.value,
			likes: 0,
		};
		const headers = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data),
		};
		fetch('http://localhost:3000/toys', headers)
			.then( res => res.json() )
			.then( json => console.log(json) )
			.then( json => getToys() )
			.catch( err => console.log(err.message) )
	} )

});

// Create function to populate toy-collection div
const populateToys = data => {
	// Target toy-collection div, store it in variable

	data.forEach(item => {
		addToyToDom(item)
	})
};

// Add a single toy to dom
const addToyToDom = toyObj => {
	const toyCollection = document.getElementById('toy-collection');
	const newToy = document.createElement('div');
	newToy.className = "card";
	
	toyCollection.appendChild(newToy);

	const toyName = document.createElement('h3');
	const toyImg = document.createElement('img');
	const toyLikes = document.createElement('p');
	const likeButton = document.createElement('button');

	newToy.append(toyName,toyImg,toyLikes,likeButton);

	toyName.innerHTML = toyObj.name;
	toyImg.src = toyObj.image;
	toyImg.className = 'toy-avatar';
	toyLikes.innerHTML = `${toyObj.likes} Likes`;
	likeButton.className = 'like-btn';
	likeButton.innerHTML = "Like <3";
};

