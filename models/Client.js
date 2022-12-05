const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const clientSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    cpf: { type: String, trim: true, required: true, unique: true },
    idCompany: { type: mongoose.Schema.Types.ObjectId, trim: true, required: true, ref: "companies" },
},
    {
        timestamps: true
    });

const Client = mongoose.model('clients', clientSchema);

module.exports = Client;