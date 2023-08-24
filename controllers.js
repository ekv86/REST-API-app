const contacts = require("./models/contacts");
const ctrlWrapper = require('./ctrlWrapper');

const listContacts = async (req, res, next) => {
    const result = await contacts.listContacts()
    res.json(result)
}

const getContactById = async (req, res, next) => {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
        const error = new Error("Not found");
        error.status = 404;
        throw error;
    }
    res.json(result)
}

const addContact = async (req, res, next) => {
    const result = await contacts.addContact(req.body);
    console.log(req.body)
    res.status(201).json(result)
}

const removeContact = async (req, res, next) => {
        const { id } = req.params;
        const result = await contacts.removeContact(id);
        if (!result) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.json({
            message: "contact deleted"
        })
}

const updateContact = async (req, res, next) => {
    const { id } = req.params;
        const result = await contacts.updateContact(id, req.body);
        if (!result) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.json(result)
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    removeContact: ctrlWrapper(removeContact),
}