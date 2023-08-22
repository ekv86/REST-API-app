const contacts = require("./models/contacts");
const addSchema = require("./schema")

const listContacts = async (req, res, next) => {
    try {
        const result = await contacts.listContacts()
        res.json(result)
    }
    catch (error) {
        next(error)
    }
}

const getContactById =  async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.getContactById(contactId);
        if (!result) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.json(result)
    }
    catch (error) {
        next(error);
    }
}

const addContact = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        const field = error.message.split(" ");
        if (error) {
            const error = new Error(`missing required ${field[0].slice(1, -1)} field`);
            error.status = 400;
            throw error;
        }
        console.log(req.body)
        const result = await contacts.addContact(req.body)
        res.status(201).json(result)
    }
    catch (error) {
        next(error);
    }
}

const removeContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);
        console.log(result)
        if (!result) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.json({
            message: "contact deleted"
        })
    }
    catch (error) {
        next(error);
    }
}

const updateContact = async (req, res, next) => {
    try {
        const { error } = addSchema.validate(req.body);
        const field = error.message.split(" ");
        if (JSON.stringify(error._original) === '{}') {
            const error = new Error("missing fields");
            error.status = 400;
            throw error;
        }
        if (error) {
            const error = new Error(`missing required ${field[0].slice(1, -1)} field`);
            error.status = 400;
            throw error;
        }
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        if (!result) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.json(result)
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    updateContact,
    removeContact,
    addContact
}