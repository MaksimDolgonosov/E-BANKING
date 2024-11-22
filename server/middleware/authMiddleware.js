const jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
    //return req
   // console.log(req.headers.authorization)
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Войдите или зарегистрируйтесь" })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Войдите или зарегистрируйтесь" })
    }
}