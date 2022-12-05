const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    addressline: { type: String, required: true },
    name: { type: String, required: true },
    documentClient: { type: String, required: true },
    email: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    uf: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now() },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: [
            "started",
            "processing",
            "pending",
            "approved",
            "refused",
            "refunded",
            "chargeback",
            "error",
        ],
        required: true
    },
    paymentType: {
        type: String, required: true, enum: ["billet", "credit_cart"]
    },
    processResponse: {
        type: String
    },
    credit: { type: mongoose.Schema.Types.ObjectId, ref: "Credits", required: true },
}, {
    timestamps: true
});

const Payment = mongoose.model('payments', PaymentSchema)

module.exports = Payment;