(async function load(){
    const moviesURL = `https://yts.am/api/v2/list_movies.json?genre=`;

    // contenedor de películas por género
    const $actionContainer = document.getElementById(`action`)
    const $dramaContainer = document.getElementById(`drama`)
    const $animationContainer = document.getElementById(`animation`)

    // otros contenedores
    const $featuringContainer = document.getElementById(`featuring`)
    const $form = document.getElementById(`form`)
    const $home = document.getElementById(`home`)

    // otros elementos del DOM
    const $modal = document.getElementById(`modal`)
    const $overlay = document.getElementById(`overlay`)
    const $hideModal = document.getElementById(`hide-modal`)

    // elementos dentro del modal
    const $modalTitle = $modal.querySelector(`h1`)
    const $modalImg = $modal.querySelector(`img`)
    const $modalDescription = $modal.querySelector(`p`)

    //-- función para hacer el request a la API --//
    async function getMovies (url) {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }

    // listas de objetos-películas por género traidos desde la API
    const actionList = await getMovies(`${moviesURL}action`)
    const dramaList = await getMovies(`${moviesURL}drama`)
    const animationList = await getMovies(`${moviesURL}animation`)

    // listas de películas por género
    const actionMovies = actionList.data.movies
    const dramaMovies = dramaList.data.movies
    const animationMovies = animationList.data.movies

    //-- función para generar el código HTML por cada película --//
    function videoTemplate(img, title) {    
        return(
            `<div class="primaryPlaylistItem"}>
                <div class="primaryPlaylistItem-image">
                <img src="${img}">
                </div>
                <h4 class="primaryPlaylistItem-title">
                ${title}
                </h4>
            </div>`
        )
    }

    //-- función para imprimir código html por cada película --//
    function printMoviesByGenre(genre, container){
        container.children[0].style = `display: none`
        genre.forEach( movie => {
            container.innerHTML += videoTemplate(movie.medium_cover_image, movie.title)
        })
    }

    // imprimir cada película por género en la página
    const actionMoviesPrinted = printMoviesByGenre(actionMovies, $actionContainer)
    const dramaMoviesPrinted = printMoviesByGenre(dramaMovies, $dramaContainer)
    const animationMoviesPrinted = printMoviesByGenre(animationMovies, $animationContainer)
})()