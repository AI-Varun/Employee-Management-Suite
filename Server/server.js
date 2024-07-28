const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('./mongodb.js');
const cookieParser = require("cookie-parser");
const routes = require('./Routes/employee');
const loginRoutes = require('./Routes/login');
const signupRoutes = require('./Routes/signup');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use('/api/v1', routes);
app.use('/api/v1/signup', signupRoutes);
app.use("/api/v1/login", loginRoutes);

const PORT = process.env.PORT || 1220;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
