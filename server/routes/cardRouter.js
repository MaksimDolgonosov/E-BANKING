const Router = require("express");
const router = new Router();
const cardController = require("../controllers/cardController")

router.post("/addCard", cardController.addCard)
router.post("/depositCard", cardController.depositCard)
router.patch("/remittanceCard", cardController.remittanceCard)
router.get("/checkCard", cardController.checkCard)
router.get("/getCards", cardController.getCard)

router.delete("/")

module.exports = router;