const User = require("../models/user-model");
const Contact = require("../models/contact-model");

// GET ALL USERS IN ADMIN PAGE
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        // console.log(users);
        if (!users || users.length === 0) {
            return res.status(400).json({ message: "No Users Found" });
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};


//SINGLE USER LOGIC
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);

    } catch (error) {
        next(error);
    }
}

//USER UPDATE LOGIC
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedUser = await User.updateOne({ _id: id }, {
            $set: updatedUserData,
        });
        return res.status(200).json(updatedUser);

    } catch (error) {
        next(error);
    }
}


//DELETE BY USER ID
const deleteUsersById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Deleted Successfully" });

    } catch (error) {
        next(error);
    }
}

// GET ALL CONTACTS IN ADMIN PAGE
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts || contacts.length === 0) {
            return res.status(400).json({ message: "No Contacts Found" });
        }
        res.status(200).json(contacts);

    } catch (error) {
        next(error);
    }
}

//DELETE CONTACT BY CONTACT ID
const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Contact Deleted Successfully" });

    } catch (error) {
        next(error);
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUsersById, getUserById, updateUserById, deleteContactById };