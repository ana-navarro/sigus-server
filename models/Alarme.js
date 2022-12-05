const Sequelize = require('sequelize');
const database = require('../db/db');
const Pop = require('./Pop');
const sequelize = new Sequelize('sqlite::memory:');

const Alarm = database.define(
  'alarmSungrow',
  {
    cod: {
      type: Sequelize.STRING(3),
      allowNull: true,
      primaryKey: true,
    },
    desc: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    pop_id: {
      type: Sequelize.INTEGER,
      // foreignKey: true,
      references: {
        model: 'pops',
        key: 'id',
      },
    },
    // createdAt: { type: Sequelize.DATE },
    // updatedAt: { type: Sequelize.DATE },
  },
  {
    timestamps: true,
    tableName: 'alarm',
  },
);

Alarm.associate = (models) =>
  Alarm.belongsTo(Pop, {
    as: 'pop',
    foreignKey: 'id_pop',
    targetKey: 'id',
  });

module.exports = Alarm;
