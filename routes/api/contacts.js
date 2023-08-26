const express = require('express')
const ctrl = require("../../controllers")
const { isValidId, validateData } = require("../../validation");
const { updateFavoriteSchema, addSchema } = require('../../models/contacts');

const router = express.Router()

router.get('/', ctrl.listContacts);
router.get('/:id', isValidId, ctrl.getContactById);
router.post('/', validateData(addSchema), ctrl.addContact);
router.delete('/:id', isValidId, ctrl.removeContact);
router.put('/:id', isValidId, validateData(addSchema), ctrl.updateContact);
router.patch('/:id/favorite', isValidId, validateData(updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router
