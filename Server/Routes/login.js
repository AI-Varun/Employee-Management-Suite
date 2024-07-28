const router = require("express").Router();
const loginController = require("../Controllers/login");
const Joi = require("joi");

const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

router.post("/", (req, res, next) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    next();
}, loginController.login);

module.exports = router;
