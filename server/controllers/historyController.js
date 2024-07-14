const syncConn = require("../db");

class HistoryController {
    async addHistory(req, res) {
        const query = `INSERT INTO history (user_id, id, total, title, date, payment) VALUES ('${req.body.user_id}','${req.body.id}','${req.body.total}','${req.body.title}','${req.body.date}','${req.body.payment}')`;
        syncConn.query(query)
        res.status(200).json(req.body);
    }
    async getHistory(req, res) {
        const history = syncConn.query(`SELECT * FROM history where user_id = '${req.query.id}'`);
        return res.json(history)
    }

}


module.exports = new HistoryController();