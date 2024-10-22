const ApiError = require("../error/apiError")
const syncConn = require("../db");

class CardController {
    async addCard(req, res) {
        const query = `INSERT INTO card (user_id, id, currency, amount, number, name, date, cvv, style) VALUES ('${req.body.user_id}','${req.body.id}','${req.body.currency}','${req.body.amount}','${req.body.number}','${req.body.name}','${req.body.date}','${req.body.cvv}','${req.body.style}')`;
        await syncConn.query(query)
        res.status(200).json(req.body);
    }
    async getCard(req, res) {
        console.log(req.query)
        const cards = await syncConn.query(`SELECT * FROM card where user_id = '${req.query.id}'`);
        console.log(cards)
        return res.json(card)
    }

}


module.exports = new CardController();