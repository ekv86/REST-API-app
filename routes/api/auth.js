const express = require('express')
const ctrl = require("../../controllers/auth")
const { validateData } = require("../../helpers/validation");
const { registerSchema, updateSubscriptionSchema } = require('../../models/user');
const authenticate = require('../../helpers/authenticate');

const router = express.Router()

router.post("/register", validateData(registerSchema), ctrl.register);
router.post("/login", validateData(registerSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch("/users", authenticate, validateData(updateSubscriptionSchema), ctrl.updateSubscription)

module.exports = router