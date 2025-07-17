const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

//HOME LOGIC
const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("Welcome! have a Great Day!using Router from controller");

    } catch (error) {
        console.log(error);
    }
};

//USER REGISTRATION LOGIC
const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Email already exist." });
        }
        //HASH THE PASSWORD 
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({ username, email, phone, password: hash_password });

        res.status(200).json({
            msg: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });

    } catch (error) {
        // res.status(500).json("Internal server error");
        next(error);
    }
};

//USER LOGIN LOGIC
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credintials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        if (isPasswordMatch) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                isAdmin: userExist.isAdmin,
            });
        } else {
            res.status(401).json({ msg: "Invalid Email or password" });
        }

    } catch (error) {
        // res.status(500).json("Internal server error");
        next(error);
    }
};

//USER LOGIC (TO SEND USER DATA)
const user = async (req, res) => {
    try {
        const userData = req.user;  //FROM auth-middleware.js
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
};

module.exports = { home, register, login, user };