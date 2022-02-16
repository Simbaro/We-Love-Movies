const movieService = require("./movies.service")

async function movieExists(req, res, next) {
    const movies = await movieService.list()
    const movieId = req.params.movieId
    const foundMovie = movies.find((movie) => movie.movie_id === Number(movieId))
    if(foundMovie) {
        res.locals.movie = foundMovie;
        return next()
    }
    next({
        status:404,
        message: "Movie cannot be found.",
    })
}

function read(req, res, next) {
    const data = res.locals.movie
    res.json({ data })
}

async function list(req, res, next) {
    const is_showing = req.query.is_showing
    if(is_showing === "true") {
    const data = await movieService.listShowingMovies();
    return res.json({ data })
    } else {
        const data = await movieService.list();
    return res.json({ data })
    }
}
async function listTheaters(req, res, next) {
const movieId = res.locals.movie.movie_id
const data = await movieService.listTheaters(movieId)
res.json({ data })
}

async function listReviews(req, res, next) {
    const movieId = res.locals.movie.movie_id
    const data = await movieService.listReviews(movieId)
    res.json({ data })
}

module.exports = {
    list,
    read: [movieExists, read],
    listTheaters: [movieExists, listTheaters],
    listReviews: [movieExists, listReviews]
    

}
