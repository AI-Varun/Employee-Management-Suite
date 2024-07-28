const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = existingUser.generateAuthToken();

        res.status(200).json({
            message: "Login successful",
            token: token,
            username: existingUser.name
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { login };
