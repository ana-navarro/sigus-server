const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const InstallationNumbersSchema = mongoose.Schema({
    numberInstallation: { type: String, requied: true },
    idCompany: { type: mongoose.Schema.Types.ObjectId, requied: true, trim: true, ref: "companies" }
});

InstallationNumbersSchema.plugin(mongoose_delete, { overrideMethods: ['count', 'find', 'errorXyz'] });
const InstallationNumbers = mongoose.model('installations', InstallationNumbersSchema);

module.exports = InstallationNumbers;