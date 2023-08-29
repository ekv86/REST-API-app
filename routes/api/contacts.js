const express = require('express')
const ctrl = require("../../controllers/controllers")
const { isValidId, validateData } = require("../../helpers/validation");
const { updateFavoriteSchema, addSchema } = require('../../models/contacts');
const authenticate = require('../../helpers/authenticate');

const router = express.Router()

router.get('/', authenticate, ctrl.listContacts);
router.get('/:id', authenticate, isValidId, ctrl.getContactById);
router.post('/', authenticate, validateData(addSchema), ctrl.addContact);
router.delete('/:id', authenticate, isValidId, ctrl.removeContact);
router.put('/:id', authenticate, isValidId, validateData(addSchema), ctrl.updateContact);
router.patch('/:id/favorite', authenticate, isValidId, validateData(updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router
