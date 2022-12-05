const Sequelize = require('sequelize');
const database = require('../db/db');
const fs = require('fs');
const path = require('path');
const sequelize = new Sequelize('sqlite::memory:');

const POP = database.define(
  'pop',
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    size: { type: Sequelize.NUMBER },
    key: { type: Sequelize.STRING },
    url: { type: Sequelize.STRING },
  },
  {
    timestamps: true,
    tableName: 'pops',
  },
);

POP.addHook('beforeCreate', (record, options) => {
  record.dataValues.createdAt = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/g, '');
  record.dataValues.updatedAt = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/g, '');
});

POP.addHook('beforeUpdate', (record, options) => {
  record.dataValues.updatedAt = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/g, '');
});

POP.addHook('beforeDestroy', async (record, options) => {
  await fs.unlink(
    path.resolve(
      __dirname,
      '..',
      '..',
      'server',
      'tmp',
      'uploads',
      'pops',
      record.key,
    ),
    function (err) {},
  );
});

module.exports = POP;
