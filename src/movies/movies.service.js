const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")


const criticObject = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
})

function list() {
    return knex("movies").select("*")
}

function listShowingMovies() {
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*")
    .where({is_showing: true})
    .groupBy("m.movie_id")
}

function listTheaters(movieId) {
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*")
    .where({"mt.movie_id": movieId })
}

function listReviews(movieId) {
return knex("reviews as r")
.join("critics as c", "r.critic_id", "c.critic_id")
.select("*")
.where({"r.movie_id": movieId})
.then((reviews) => reviews.map(criticObject))
}

module.exports = {
    list,
    listShowingMovies,
    listTheaters,
    listReviews,
}