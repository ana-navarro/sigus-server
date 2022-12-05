const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    street: { type: String, required: true },
    number: { type: String, required: true },
    moreInfo: { type: String, default: '' },
    block: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true, default: 'Brasil' },
    postalCode: { type: Number, required: true },
    idCompany: { type: mongoose.Schema.Types.ObjectId, trim: true, required: true, ref: "companies" }
});

const Address = mongoose.model('address', addressSchema);

module.exports = Address;