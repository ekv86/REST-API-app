const { Contact } = require("../models/contacts")
const ctrlWrapper = require('../helpers/ctrlWrapper');
const HttpError = require("../helpers/httpError");

const listContacts = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email")
    res.json(result)
}

const getContactById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, "Not found" )
    }
    res.json(result)
}

const addContact = async (req, res, next) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    console.log(req.body)
    res.status(201).json(result)
}

const removeContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.json({
        message: "contact deleted"
    })
}

const updateContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.json(result)
}

const updateStatusContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.json(result)
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    removeContact: ctrlWrapper(removeContact),
}