/* eslint-disable */
const Router = require("express");
const router = new Router();
//subroutes
const userRouter = require("./userRouter");
const cardRouter = require("./cardRouter");
const historyRouter = require("./historyRouter");


router.use('/user', userRouter);
router.use('/cards', cardRouter);
router.use('/history', historyRouter);




module.exports = router;
