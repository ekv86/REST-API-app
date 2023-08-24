

const validateData = schema => {
    const func = (req, res, next) => {
        const { error: validationErr, value } = schema.validate(req.body);
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

module.exports = validateData;