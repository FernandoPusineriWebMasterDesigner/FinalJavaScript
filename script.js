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
            addToFavoritesButton.click(function () {
                addToFavorites(movie);
            });


            movieItem.append(movieImage, movieTitle, movieDirector, movieYear, movieGenre, addToFavoritesButton);


            moviesList.append(movieItem);
        });
    }


    function addToFavorites(movie) {
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
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
            var removeButton = $("<button>").text("Eliminar de favoritos");
            removeButton.click(function () {
                removeFromFavorites(movie);
            });
            favoriteItem.append(movieTitle, removeButton);
            favoritesList.append(favoriteItem);
        });
    }


    function removeFromFavorites(movie) {
        var favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        var updatedFavorites = favorites.filter(function (favorite) {
            return favorite.title !== movie.title;
        });
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        displayFavorites();
    }


    loadMovies();
});







