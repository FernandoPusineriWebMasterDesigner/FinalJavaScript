document.addEventListener("DOMContentLoaded", function () {
    let movies = [];
    let userId;
    const jsonUrl = "movies.json";

    function loadMovies() {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                movies = data;
                displayMovies(movies);
            })
            .catch(error => console.error("Error al cargar el archivo JSON: ", error));
    }

    function displayMovies(movies) {
        const moviesList = document.getElementById("searchResults");
        moviesList.innerHTML = "";

        movies.forEach(movie => {
            const movieItem = document.createElement("div");
            const movieImage = document.createElement("img");
            movieImage.src = movie.imagen;
            movieImage.alt = movie.title;
            const movieTitle = document.createElement("h2");
            movieTitle.textContent = movie.title;
            const movieDirector = document.createElement("p");
            movieDirector.textContent = "Director: " + movie.director;
            const movieYear = document.createElement("p");
            movieYear.textContent = "Año: " + movie.year;
            const movieGenre = document.createElement("p");
            movieGenre.textContent = "Género: " + movie.genre;

            const addToFavoritesButton = document.createElement("button");
            addToFavoritesButton.textContent = "Agregar a favoritos";
            addToFavoritesButton.addEventListener("click", () => addToFavorites(movie));

            movieItem.append(movieImage, movieTitle, movieDirector, movieYear, movieGenre, addToFavoritesButton);
            moviesList.appendChild(movieItem);
        });
    }

    function addToFavorites(movie) {
        const userId = getUserId();
        let userFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
        
        console.log("Películas favoritas actuales:", userFavorites);
        
        const isDuplicate = userFavorites.some(favorite => favorite.title === movie.title);
        
        if (isDuplicate) {
            Swal.fire({
                icon: 'warning',
                title: '¡Atención!',
                text: 'Esa película ya la has agregado',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Entendido'
            });
            return;
        }
        
        userFavorites.push(movie);
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(userFavorites));
        
        console.log("Película añadida a favoritos:", movie);
        console.log("Películas favoritas actualizadas:", userFavorites);
        
        displayFavorites(); 
        
        try {
            Toastify({
                text: `¡${movie.title} fue añadida a tus favoritos!`,
                duration: 3000,
                close: true,
                position: 'top-right',
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                    color: "#fff"
                }
            }).showToast();
        } catch (error) {
            console.error("Error al mostrar el toast: ", error);
        }  
    }
    
    function getUserId() {
        if (!userId) {
            userId = Math.floor(Math.random() * 1000);
        }
        return userId;
    }
    

    function displayFavorites() {
        const favoritesList = document.getElementById("favoritesList");
        favoritesList.innerHTML = "";
    
        const userId = getUserId();
        const favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    
        console.log("Películas favoritas obtenidas:", favorites);
    
        favorites.forEach(movie => {
            const favoriteItem = document.createElement("div");
            const movieTitle = document.createElement("span");
            movieTitle.textContent = movie.title;
            const movieThumbnail = document.createElement("img");
            movieThumbnail.src = movie.imagen;
            movieThumbnail.alt = movie.title;
            movieThumbnail.style.width = "55px";
            movieThumbnail.style.height = "60px";
            const removeButton = document.createElement("button");
            removeButton.textContent = "Eliminar de favoritos";
            removeButton.addEventListener("click", () => removeFromFavorites(movie));
            favoriteItem.append(movieThumbnail, movieTitle, removeButton);
            favoritesList.appendChild(favoriteItem);
        });
    }
    

    function removeFromFavorites(movie) {
        const userId = getUserId();
        let favorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
        favorites = favorites.filter(favorite => favorite.title !== movie.title);
        localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
        displayFavorites();
    }
    

    document.getElementById("toggleFavoritesList").addEventListener("click", function () {
        const favoritesList = document.getElementById("favoritesList");
        favoritesList.classList.toggle("show");
    });

    document.getElementById("searchButton").addEventListener("click", function () {
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        displayMovies(filteredMovies);
    });

    loadMovies();
});















