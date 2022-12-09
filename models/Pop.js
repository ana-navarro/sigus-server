const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const POPSchema = mongoose.Schema({
  name: { type: String },
  size: { type: Number },
  key: { type: String },
  url: { type: String },
});

POPSchema.pre('remove', function () {
  try {
    fs.unlinkSync(
      path.resolve(
        __dirname,
        '..',
        '..',
        'sigus-server',
        'tmp',
        'uploads',
        'pops',
        this.key,
      ),
    );
  } catch (error) {
    console.log(error);
  }
});

const POP = mongoose.model('POP', POPSchema);

module.exports = POP;
