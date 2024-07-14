const Router = require("express");
const router = new Router();
const cardController = require("../controllers/cardController")

router.post("/", cardController.addCard)
router.get("/", cardController.getCard)
router.delete("/")

module.exports = router;