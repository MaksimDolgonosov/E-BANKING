const ApiError = require("../error/apiError");

class UserController {
    async registration(req, res) {

    }
    async login(req, res) {
        
    }
    async check(req, res) {
        const { id } = req.query;

        if(!id) {
            return next(ApiError.badRequest("Не задан Id-параметр"))
        }
        res.json(req.query)
    }
}


module.exports = new UserController();