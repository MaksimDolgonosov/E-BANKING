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
        const candidate = syncConn.query(`SELECT * FROM user where email = '${email}'`);
        console.log(candidate.length===0)

        if (candidate.length > 0) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует!"))
        }
        const hashPassword = await bcrypt.hash(password, 5);

        const account = uuid.v4();
        console.log(hashPassword.length)
        const user = await syncConn.query(`INSERT INTO user (id, email, password, account, phone, name, surname) VALUES (${null},'${email}','${hashPassword}','${account}','','${name}','${surname}')`);
        const jwtUser = jwt.sign({ id: user.id, email }, process.env.SECRET_KEY);
        res.json(user)
    }

    async login(req, res) {

    }
    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest("Не задан id-параметр"))
        }
        res.json(id)
    }
}


module.exports = new UserController();