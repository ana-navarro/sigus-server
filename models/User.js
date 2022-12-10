const mongoose = require("mongoose");
var bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, min: 8, max: 64, required: true },
    role: { type: String, default: 'admin', required: true },
},
    {
        timestamps: true
    });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('admins', userSchema);

module.exports = User;