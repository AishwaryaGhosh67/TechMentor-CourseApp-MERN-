const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

//SECUTE THE PASSWORD BY BCRYPTJS
// userSchema.pre('save', async function (next) {
//     //getting all dat useing this method

//     const user = this;
//     if (!user.isModified(user.password)) {
//         next();
//     }

//     try {
//         const saltRound = await bcrypt.getSalt(10);
//         const hash_password = await bcrypt.hash(user.password, saltRound);
//         user.password = hash_password;

//     } catch (error) {
//         next(error);
//     }

// })

//json web token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SCRECT_KEY, {
            expiresIn: "30d",
        }
        );
    } catch (error) {
        console.log(error);
    }
};

//DEFINE THE MODEL OR THE COLLECTION NAME
const User = new mongoose.model("User", userSchema);

module.exports = User;