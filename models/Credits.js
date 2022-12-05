const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');

const CreditSchema = mongoose.Schema({
    idInstallation: { type: mongoose.Schema.Types.ObjectId, ref: "installations", required: true },
    month: { type: String, required: true },
    consumed: { type: Number, required: true },
    distribuition: { type: Number, required: true },

    discount: { type: Number, required: true },
    usedBalance: { type: Number, required: true },
    previousBalance: { type: Number, required: true },
    actualBalance: { type: Number, required: true },
    injected: { type: Number, required: true },
    valueKwh: { type: Number, required: true },
    expirationDate: { type: String, required: true },
    totalInjected: { type: Number, required: true },
    valueEnergy: { type: Number, required: true },
    valueDiscount: { type: Number, required: true },
    valuePayment: { type: Number, required: true },
},
    {
        timestamps: true
    });

CreditSchema.plugin(mongoose_delete, { overrideMethods: ['count', 'find', 'errorXyz'] });

const Credit = mongoose.model('Credits', CreditSchema);

module.exports = Credit;