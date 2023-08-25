const express = require('express')
const ctrl = require("../../controllers")
const addSchema = require("../../schema")
const validateData = require("../../validateData")

const router = express.Router()


router.get('/', ctrl.listContacts);

router.get('/:id', ctrl.getContactById);

router.post('/', validateData(addSchema), ctrl.addContact);

router.delete('/:id', ctrl.removeContact);

router.put('/:id', validateData(addSchema), ctrl.updateContact);

module.exports = router
