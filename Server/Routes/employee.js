const express = require('express');
const router = express.Router();
const Joi = require('joi');
const employeeController = require('../Controllers/employee');
const multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const createUserSchema = Joi.object({
    name: Joi.string().regex(/^[A-Za-z\s]+$/).required().messages({
        'string.empty': 'Name is required',
        'string.pattern.base': 'Name must contain only letters and spaces'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be valid'
    }),
    mobileNo: Joi.string().length(10).regex(/^[0-9]+$/).required().messages({
        'string.empty': 'Mobile number is required',
        'string.length': 'Mobile number must be 10 digits long',
        'string.pattern.base': 'Mobile number must be numeric'
    }),
    designation: Joi.string().required().messages({
        'string.empty': 'Designation is required'
    }),
    gender: Joi.string().valid('Male', 'Female').required().messages({
        'string.empty': 'Gender is required',
        'any.only': 'Gender must be Male or Female'
    }),
    course: Joi.string().required().messages({
        'string.empty': 'Course is required'
    }),
    image: Joi.string().optional()
});

const updateUserSchema = Joi.object({
    name: Joi.string().regex(/^[A-Za-z\s]+$/).required().messages({
        'string.empty': 'Name is required',
        'string.pattern.base': 'Name must contain only letters and spaces'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be valid'
    }),
    mobileNo: Joi.string().length(10).regex(/^[0-9]+$/).required().messages({
        'string.empty': 'Mobile number is required',
        'string.length': 'Mobile number must be 10 digits long',
        'string.pattern.base': 'Mobile number must be numeric'
    }),
    designation: Joi.string().optional().messages({
        'string.empty': 'Designation must be a string'
    }),
    gender: Joi.string().valid('Male', 'Female').optional().messages({
        'any.only': 'Gender must be Male or Female'
    }),
    course: Joi.string().optional().messages({
        'string.empty': 'Course must be a string'
    }),
    image: Joi.string().optional()
});

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => ({ message: err.message }));
        return res.status(400).json({ errors });
    }
    next();
};

router.get('/users', (req, res) => {
    employeeController.getUsers(req, res);
});

router.post('/create', upload.single('image'), validateRequest(createUserSchema), (req, res, next) => {
    if (req.file) {
        req.body.image = req.file.buffer.toString('base64');
    }
    next();
}, (req, res) => {
    employeeController.createUser(req, res);
});

router.post('/users/:id', upload.single('image'), validateRequest(updateUserSchema), (req, res, next) => {
    if (req.file) {
        req.body.image = req.file.buffer.toString('base64');
    }
    next();
}, (req, res) => {
    employeeController.updateUser(req, res);
});

router.delete('/users/:id', (req, res) => {
    employeeController.deleteUser(req, res);
});

module.exports = router;
