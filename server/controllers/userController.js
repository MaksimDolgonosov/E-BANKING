const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const syncConn = require("../db");
const uuid = require("uuid");




class UserController {
    async registration(req, res, next) {
        const { email, password, name, surname } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest("Неверный логин или пароль"))
        }
        const candidate = await syncConn.query(`SELECT * FROM user where email = '${email}'`);

        if (candidate.length > 0) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует!"))
        }
        const hashPassword = await bcrypt.hash(password.toString(), 5);


        const account = uuid.v4();

        const user = await syncConn.query(`INSERT INTO user (id, email, password, account, phone, name, surname) VALUES (${null},'${email}','${hashPassword}','${account}','','${name}','${surname}')`);
        const token = jwt.sign({ id: user.insertId, email }, process.env.SECRET_KEY, { expiresIn: "24h" });
        res.json({ token })
    }

    async login(req, res, next) {

        const { email, password } = req.body;

        const candidate = await syncConn.query(`SELECT * FROM user where email = '${email}'`);

        if (candidate.length === 0) {
            return next(ApiError.internal("Пользователя с таким email не существует!"));
        }
        let comparePassword = bcrypt.compareSync(password, candidate[0].password);

        if (!comparePassword) {
            return next(ApiError.internal("Неверный пароль!"));
        }
        const token = jwt.sign({ id: candidate[0].id, email }, process.env.SECRET_KEY, { expiresIn: "120s" });
        //res.json({ token })
        res.json({ id: candidate[0].id, name: candidate[0].name, surname: candidate[0].surname, token, lodingStatus: "idle", login: true })
    }

    async check(req, res, next) {
        const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.SECRET_KEY, { expiresIn: "120s" });
        res.json({ token })
    }
}


module.exports = new UserController(); 