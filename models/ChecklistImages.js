const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const Schema = mongoose.Schema;

const checklistSchema = new Schema(
  {
    idInstallationNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'installations',
      required: true,
    },
    date: Date,
    name: String,
    size: Number,
    key: String,
    url: String,
    date: Date,
  },
  {
    timestamp: true,
  },
);

checklistSchema.pre('save', function () {
  if (this.url) {
    this.url = `${this.url}\\${this.key}`;
  } else {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

checklistSchema.pre('remove', async function () {
  if (this.url) {
    await fs.unlink(
      path.resolve(
        __dirname,
        '..',
        '..',
        'server',
        'tmp',
        'uploads',
        'images',
        this.key,
      ),
      function (err) {},
    );
  }
});

const Check = mongoose.model('ChecklistImages', checklistSchema);
module.exports = Check;
