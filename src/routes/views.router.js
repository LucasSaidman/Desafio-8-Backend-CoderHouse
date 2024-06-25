const express = require("express");
const router = express.Router();
const ViewsManager = require("../controllers/ViewManager.js");
const viewsManager = new ViewsManager();
const checkUserRole = require('../middleware/checkrole.js');
const passport = require('passport');


router.get("/products", checkUserRole(['usuario']),passport.authenticate('jwt', { session: false }), viewsManager.renderProducts);

router.get("/carts/:cid", viewsManager.renderCart);
router.get("/login", viewsManager.renderLogin);
router.get("/register", viewsManager.renderRegister);
router.get("/realtimeproducts", checkUserRole(['admin']), viewsManager.renderRealTimeProducts);
router.get("/chat", checkUserRole(['usuario']) ,viewsManager.renderChat);
router.get("/", viewsManager.renderHome);

module.exports = router;