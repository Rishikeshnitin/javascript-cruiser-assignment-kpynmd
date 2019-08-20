function getMovies() {
	let moviePromise = new Promise((resolve, reject) => {
		fetch('http://localhost:3000/movies', {
			headers: {
				'content-type': 'application/json'
			}
		})
		.then(response => {
			resolve(response.json());
		});
	});
	
	moviePromise.then(function(data) {
		// updating the movie data in DOM
		let result = '';
		data.forEach(function(movie) {
			result += '<li class="justify-content-between d-flex my-4" id="' + movie.id  + '">' + movie.title + '<a href="#" onclick="addFavourite(' + movie.id + ')" class="btn btn-primary">Add to favourties</a></li>';
		});
		document.getElementById('moviesList').innerHTML = result;
	})
	return moviePromise;
	// return fetch('http://localhost:3000/movies', {
	// 	headers: {
	// 		'content-type': 'application/json'
	// 	}
	// })
	// .then(response => {
	// 	console.log(response.json())
	// 	return response.json();
	// })
	// .then(data => {
	// 	let result = '';
	// 	data.forEach(function(movie) {
	// 		result += '<li class="justify-content-between d-flex my-4">' + movie.title + '<a href="#" onclick="addFavourite(' + movie.id + ')" class="btn btn-primary">Add to favourties</a></li>';
	// 	});
	// 	document.getElementById('moviesList').innerHTML = result;
	// })
}

function getFavourites() {
	let favoritePromise = new Promise((resolve, reject) => {
		fetch('http://localhost:3000/favourites', {
			headers: {
				'content-type': 'application/json'
			}
		})
		.then(response => {
			resolve(response.json());
		})
	});
	favoritePromise.then((data) => {
		let result = '';
		data.forEach(function(movie) {
			result += '<li class="my-3">' + movie.title + '</li>';
		});
		document.getElementById('favouritesList').innerHTML = result;
	})
	// fetch('http://localhost:3000/favourites', {
	// 	headers: {
	// 		'content-type': 'application/json'
	// 	}
	// })
	// .then(response => response.json())
	// .then(data => {
	// 	let result = '';
	// 	data.forEach(function(movie) {
	// 		result += '<li class="my-3">' + movie.title + '</li>';
	// 	});
	// 	document.getElementById('favouritesList').innerHTML = result;
	// })
	return favoritePromise;
}

function addFavourite(id) {
	let movieData;
	let favouriteData;
	const url = 'http://localhost:3000/movies/' + id;

	fetch(url, {
		method: 'GET',
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(data => {
		favouriteData = data;
		var p1 = new Promise(
			(resolve, reject) => {
				fetch('http://localhost:3000/favourites', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify(favouriteData)
				})
				.then(data => {
					resolve(favouriteData);
					return favouriteData;
				});
			}
		);
	});

	
	// p1.then((data) => {
	// 	console.log(favouriteData.title + " hi");
	// 	return new Promise((resolve, reject) => {
	// 		fetch('http://localhost:3000/favourites', {
	// 			method: 'POST',
	// 			headers: {
	// 				'content-type': 'application/json'
	// 			},
	// 			body: JSON.stringify(favouriteData)
	// 		})
	// 		.then(data => {
	// 			return favouriteData;
	// 		});
	// 	})		
	// })
	
	

	//return p1;

}

//getMovies();
//getFavourites();

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution
