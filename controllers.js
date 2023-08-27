const {Contact} = require("./models/contacts")
const ctrlWrapper = require('./ctrlWrapper');

const listContacts = async (req, res, next) => {
    const result = await Contact.find()
    res.json(result)
}

const getContactById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
        const error = new Error("Not found");
        error.status = 404;
        throw error;
    }
    res.json(result)
}

const addContact = async (req, res, next) => {
    const result = await Contact.create(req.body);
    console.log(req.body)
    res.status(201).json(result)
}

const removeContact = async (req, res, next) => {
        const { id } = req.params;
        const result = await Contact.findByIdAndRemove(id);
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
        const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
        if (!result) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.json(result)
}

const updateStatusContact = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
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
    updateStatusContact: ctrlWrapper(updateStatusContact),
    removeContact: ctrlWrapper(removeContact),
}