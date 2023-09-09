const { isValidObjectId } = require("mongoose");
const HttpError = require("./httpError");
const { emailSchema } = require("../models/user");

const validateData = schema => {
    const func = (req, res, next) => {
        const { error: validationErr, value } = schema.validate(req.body);
        console.log(validationErr)
        if (validationErr && validationErr.details[0].context.label === 'favorite') {
            next(HttpError(400, validationErr.message));
        }
        if (JSON.stringify(value) === '{}' && schema === emailSchema) {
            next(HttpError(400, validationErr.message));
        }
        if (JSON.stringify(value) === '{}') {
            next(HttpError(400, "missing fields"));
        }
        if (JSON.stringify(value) !== '{}' && validationErr) {
            next(HttpError(400, validationErr.message));
        }
        next()
    }

    return func;
}

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(HttpError(400, `${id} is not valid id`));
    }
    next();
}

module.exports = { validateData, isValidId };