const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');

const companySchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    cnpj: { type: String, required: true },
});

companySchema.plugin(mongoose_delete, { overrideMethods: ['count', 'find', 'errorXyz'] });

const Company = mongoose.model('companies', companySchema);

module.exports = Company;