const ApiError = require("../error/apiError")
const syncConn = require("../db");

class CardController {
    async addCard(req, res) {
        const query = `INSERT INTO card (user_id, id, currency, amount, number, name, date, cvv, style) VALUES ('${req.body.user_id}','${req.body.id}','${req.body.currency}','${req.body.amount}','${req.body.number}','${req.body.name}','${req.body.date}','${req.body.cvv}','${req.body.style}')`;
        await syncConn.query(query)
        res.status(200).json(req.body);
    }
    async getCard(req, res) {
        const cards = await syncConn.query(`SELECT * FROM card where user_id = '${req.query.id}'`);
        return res.json(cards)
    }
    async depositCard(req, res) {
        // console.log(req.query)
        const amount = await syncConn.query(`SELECT amount FROM card where user_id = '${+req.query.user_id}' && id = '${+req.query.id}'`);
        const newAmount = await amount[0].amount + +req.query.deposit;
        const card = await syncConn.query(`UPDATE card SET amount='${newAmount}' where user_id = '${+req.query.user_id}' && id = '${+req.query.id}'`);
        return res.json(card)
    }
        async remittanceCard(req, res) {
            if (req.query.user_id!=="undefined" && req.query.id!=="undefined" && req.query.deposit!=="undefined") {
        const amount = await syncConn.query(`SELECT amount FROM card where user_id = '${+req.query.user_id}' && id = '${+req.query.id}'`);
        const newAmount = await amount[0].amount - +req.query.deposit;
        const card = await syncConn.query(`UPDATE card SET amount='${newAmount}' where user_id = '${+req.query.user_id}' && id = '${+req.query.id}'`);
                return res.json(card)
            } else {
                
            return res.status(500).json({message: "No parametrs for fetching"})
        }

    }
        async checkCard(req, res) {
        // console.log(req.query)
        const card = await syncConn.query(`SELECT * FROM card where number = '${req.query.number}'`);
        // const newAmount = await amount[0].amount - +req.query.deposit;
       // const card = await syncConn.query(`UPDATE card SET amount='${newAmount}' where user_id = '${+req.query.user_id}' && id = '${+req.query.id}'`);
        return await res.json(card[0])
    }

}


module.exports = new CardController();