const reviewService = require("./review.service")



async function reviewExists(req, res, next) {
    const reviews = await reviewService.list()
    const reviewId = req.params.reviewId
    const foundReview = reviews.find((review) => review.review_id === Number(reviewId))
    if (foundReview) {
        res.locals.review = foundReview
        return next()
    }
next({
    status: 404,
    message: "Review cannot be found.",
})
}

async function destroy(req, res, next) {
    const reviewId = res.locals.review.review_id
    await reviewService.delete(reviewId)
    res.sendStatus(204)
}

async function update(req, res, next) {
    const reviewId = res.locals.review.review_id
    const updatedReview = {
        ...req.body.data,
        review_id: reviewId
    }
    await reviewService.update(updatedReview)
    const [data] = await reviewService.listReviewsCritics(reviewId)
    res.json({ data })
    
}

module.exports = {
    delete: [reviewExists, destroy],
    update: [reviewExists, update]
}