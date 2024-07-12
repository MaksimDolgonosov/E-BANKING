const ApiError = require("../error/apiError")
const syncConn = require("../db");

class CardController {
    async addCard(req, res) {

    }
    async getCard(req, res) {
        const id = req.query.id.toString();
        const card = syncConn.query(`SELECT * FROM card where user_id = '${req.query.id}'`);
        return res.json(card)
    }

}


module.exports = new CardController();