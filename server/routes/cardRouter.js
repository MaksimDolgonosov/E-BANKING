const Router = require("express");
const router = new Router();
const cardController = require("../controllers/cardController")

router.post("/")
router.get("/getCard", cardController.getCard)
router.delete("/")

module.exports = router;