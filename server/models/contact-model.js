const { Schema, model, default: mongoose } = require("mongoose");

const contactSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

//CREATE A MODEL OR COLLECTION
const Contact = new model('Contact', contactSchema);
module.exports = Contact; 