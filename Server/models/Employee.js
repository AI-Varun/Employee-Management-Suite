const mongoose = require('mongoose');
let generateUniqueId;

(async () => {
    const { customAlphabet } = await import('nanoid');
    generateUniqueId = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10);
})();

const employeeSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true,
        unique: true,
        default: () => generateUniqueId ? generateUniqueId() : ''
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    image: { type: String },
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
