const { Schema, model } = require("mongoose");
const Joi = require("joi");
const mongooseError = require("../helpers/mongooseError");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscriptionList,
        default: "starter"
    },
    token: {
        type: String,
        default: ""
    },
    avatarUrl: {
        type: String
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", mongooseError);

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": "missing required email field",
    }),
    password: Joi.string().required().messages({
        "any.required": "missing required password field",
    }),
})

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "any.required": "missing required field email",
    })
})

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList).required()
})

const User = model("user", userSchema);

module.exports = { User, registerSchema, updateSubscriptionSchema, emailSchema };