const router = require("express").Router();
const signupController = require("../Controllers/signup");
const Joi = require("joi");

const validateRegister = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

router.post("/", (req, res, next) => {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    next();
}, signupController.register);

module.exports = router;
