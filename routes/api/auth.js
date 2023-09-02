const express = require('express')
const ctrl = require("../../controllers/auth")
const { validateData } = require("../../helpers/validation");
const { registerSchema, updateSubscriptionSchema } = require('../../models/user');
const authenticate = require('../../helpers/authenticate');
const upload = require('../../helpers/upload');

const router = express.Router()

router.post("/register", validateData(registerSchema), ctrl.register);
router.post("/login", validateData(registerSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch("/", authenticate, validateData(updateSubscriptionSchema), ctrl.updateSubscription)
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)


module.exports = router