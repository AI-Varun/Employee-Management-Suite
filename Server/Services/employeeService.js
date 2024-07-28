const Employee = require('../models/Employee');

const getUsers = () => Employee.find();
const createUser = (employeeData) => Employee.create(employeeData);
const updateUser = (id, employeeData) => Employee.findOneAndUpdate({ uniqueId: id }, employeeData, { new: true });
const deleteUser = (id) => Employee.findByIdAndDelete(id);

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
