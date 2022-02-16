const theaterService = require("./theaters.service")

async function list(req, res, next) {
    const data = await theaterService.list()
    res.json({ data })

}


module.exports = {
    list,
}