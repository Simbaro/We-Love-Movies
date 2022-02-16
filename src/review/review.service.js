const knex = require("../db/connection")


function insertCritic(reviews) {
    return reviews.map((review) => {
        return {
            review_id: review.review_id,
            content: review.content,
            score: review.score,
            created_at: review.created_at,
            updated_at: review.updated_at,
            critic_id: review.critic_id,
            movie_id: review.movie_id,
            critic: {
                critic_id: review.critic_id,
                preferred_name: review.preferred_name,
                surname: review.surname,
                organization_name: review.organization_name
            }
        }
    })
}



//list all reviews
function list() {
return knex("reviews").select("*")
}

//delete review by id.
function destroy(review_id) {
    return knex("reviews").where({ review_id }).del()
}

function update(updatedReview) {
    return knex("reviews")
            .join("critics as c", "r.critic_id", "c.critic_id")
            .select("*")
            .where({ review_id: updatedReview.review_id })
            .update(updatedReview, "*")
}

function listReviewsCritics(reviewId) {
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({"r.review_id": reviewId})
    .then(insertCritic)
}



module.exports = {
    list,
    delete: destroy,
    update,
    listReviewsCritics,
}