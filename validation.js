const { isValidObjectId } = require("mongoose");

const validateData = schema => {
    const func = (req, res, next) => {
        const { error: validationErr, value } = schema.validate(req.body);
        console.log(validationErr)
        if (validationErr && validationErr.details[0].context.label === 'favorite') {
            const error = new Error(validationErr.message);
            error.status = 400;
            throw error;
        }
        if (JSON.stringify(value) === '{}') {
            const error = new Error("missing fields");
            error.status = 400;
            throw error;
        }
        if (JSON.stringify(value) !== '{}' && validationErr) {
            const error = new Error(validationErr.message);
            error.status = 400;
            throw error;
        }
        next()
    }

    return func;
}

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        const error = new Error(`${id} is not valid id`);
        error.status = 400;
        throw error;
    }
    next();
}

module.exports = { validateData, isValidId };