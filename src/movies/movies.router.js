const router = require("express").Router();
const controller = require("./movies.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")


//route for /movie/:movieId/reviews
router
    .route("/:movieId/reviews")
    .get(controller.listReviews)
    .all(methodNotAllowed)

//route for /movies/:movieId/theaters
router
    .route("/:movieId/theaters")
    .get(controller.listTheaters)
    .all(methodNotAllowed)
//route for /movies/:movieId
router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed)

//route for /movies
router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;