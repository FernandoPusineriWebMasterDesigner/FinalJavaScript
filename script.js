$(document).ready(function () {
    var movies = [];
    var jsonUrl = "movies.json";

    function loadMovies() {
        $.ajax({
            url: jsonUrl,
            dataType: "json",
            success: function (data) {
                movies = data;
                displayMovies(movies);
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar el archivo JSON: " + error);
            }
        });
    }

    function displayMovies(movies) {
        var moviesList = $("#searchResults");
        moviesList.empty();

        movies.forEach(function (movie) {
            var movieItem = $("<div>");
            var movieImage = $("<img>").attr("src", movie.imagen).attr("alt", movie.title);
            var movieTitle = $("<h2>").text(movie.title);
            var movieDirector = $("<p>").text("Director: " + movie.director);
            var movieYear = $("<p>").text("Año: " + movie.year);
            var movieGenre = $("<p>").text("Género: " + movie.genre);

            var addToFavoritesButton = $("<button>").text("Agregar a favoritos");
            addToFavoritesButton.click(() => addToFavorites(movie));

            movieItem.append(movieImage, movieTitle, movieDirector, movieYear, movieGenre, addToFavoritesButton);
            moviesList.append(movieItem);
        });
    }

    function addToFavorites(movie) {
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        var isDuplicate = favorites.some(favorite => favorite.title === movie.title);

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

        favorites.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
    }

    function displayFavorites() {
        var favoritesList = $("#favoritesList");
        favoritesList.empty();

        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        favorites.forEach(function (movie) {
            var favoriteItem = $("<div>");
            var movieTitle = $("<span>").text(movie.title);
            var movieThumbnail = $("<img>").attr("src", movie.imagen).attr("alt", movie.title).css({ "width": "55px", "height": "60px" });
            var removeButton = $("<button>").text("Eliminar de favoritos");
            removeButton.click(() => removeFromFavorites(movie));
            favoriteItem.append(movieThumbnail, movieTitle, removeButton);
            favoritesList.append(favoriteItem);
        });
    }

    function removeFromFavorites(movie) {
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        var updatedFavorites = favorites.filter(favorite => favorite.title !== movie.title);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        displayFavorites();
    }

    $("#toggleFavoritesList").click(function () {
        $("#favoritesList").toggleClass("show");
    });

    $("#searchButton").click(function () {
        var searchTerm = $("#searchInput").val().toLowerCase();
        var filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        displayMovies(filteredMovies);
    });

    loadMovies();
});







