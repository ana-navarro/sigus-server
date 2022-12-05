const Alarm = require('../models/Alarme');

const getAlarm = async (req, res) => {
  try {
    const cod = req.params.id;
    const alarm = await Alarm.findByPk(cod);
    res.status(200).json(alarm);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const getAllAlarm = async (req, res) => {
  try {
    const alarm = await Alarm.findAll({});
    res.status(200).json(alarm);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const createAlarm = async (req, res) => {
  try {
    const { cod, desc, pop_id } = req.body;
    const alarm = await Alarm.create({
      cod,
      desc,
      pop_id,
    });
    res.status(201).json({ msg: 'Alarme foi criado com sucesso!', alarm });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const updateAlarm = async (req, res) => {
  try {
    const id = req.params.id;
    const { cod, desc, pop_id } = req.body;
    const alarm = await Alarm.findByPk(id);
    await alarm.update({
      desc,
      pop_id,
    });
    alarm.save();
    res.status(200).json({ msg: 'Alarme atualizado com sucesso!', alarm });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const deleteAlarm = async (req, res) => {
  try {
    const id = req.params.id;
    const alarm = await Alarm.findByPk(id);
    await alarm.destroy();
    res.status(200).json({ msg: 'Alarme deletado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

module.exports = {
  getAlarm,
  getAllAlarm,
  createAlarm,
  updateAlarm,
  deleteAlarm,
};
