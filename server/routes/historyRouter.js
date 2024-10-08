const Router = require("express");
const router = new Router();
const historyController = require("../controllers/historyController")

router.post("/", historyController.addHistory)
router.get("/:id", historyController.getHistory) 

module.exports = router;