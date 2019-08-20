function getMovies() {
	fetch('http://localhost:3000/movies', {
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(data => {
		let result = '';
		data.forEach(function(movie) {
			result += '<li class="justify-content-between d-flex my-4">' + movie.title + '<a href="#" onclick="addFavourite(' + movie.id + ')" class="btn btn-primary">Add to favourties</a></li>';
		});
		document.getElementById('moviesList').innerHTML = result;
	})
}

function getFavourites() {
	fetch('http://localhost:3000/favourites', {
		headers: {
			'content-type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(data => {
		let result = '';
		data.forEach(function(movie) {
			result += '<li class="my-3">' + movie.title + '</li>';
		});
		document.getElementById('favouritesList').innerHTML = result;
	})
}

function addFavourite(id) {
	let movieData;
	var p1 = new Promise(
		(resolve, reject) => {
			const url = 'http://localhost:3000/movies/' + id;
			let favouriteData;
			fetch(url, {
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				}
			})
			.then(response => response.json())
			.then(data => {
				favouriteData = data;
			});

			fetch(url, {
				method: 'DELETE'
			})
			.then(response => {
				getMovies();
				
				// updating the Favoruites data
				fetch('http://localhost:3000/favourites', {
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify(favouriteData)
				})
				.then(data => {
					getFavourites();
				});
			});
		}
	)

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
