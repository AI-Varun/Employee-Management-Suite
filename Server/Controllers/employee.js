const employeeService = require('../Services/employeeService');

const getUsers = async (req, res) => {
    const users = await employeeService.getUsers();
    res.status(200).json({ success: true, count: users.length, data: users });
};


const createUser = async (req, res) => {
    const user = await employeeService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
};


const updateUser = async (req, res) => {
    const { id } = req.params;
    const updatedUser = await employeeService.updateUser(id, req.body);
    res.status(200).json({ success: true, data: updatedUser });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    await employeeService.deleteUser(id);
    res.status(200).json({ success: true, message: 'Employee deleted successfully' });
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
