const Pop = require('../models/Pop');
const Alarm = require('../models/Alarme');
const crypto = require('crypto');

const getPop = async (req, res) => {
  try {
    const cod = req.params.id;
    const pop = await Pop.findByPk(cod);
    res.status(200).json(pop);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const getAllPop = async (req, res) => {
  try {
    const pop = await Pop.findAll({});
    res.status(200).json(pop);
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const createPop = async (req, res) => {
  try {
    const randomCrypto = crypto.randomBytes(8).toString('hex');
    const pop = Pop.build({
      id: randomCrypto,
      name: req.file.originalname,
      size: req.file.size,
      key: req.file.key,
      url: req.file.path,
    });
    await pop.save();
    res.status(201).json({ pop, msg: 'POP has been created!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

const deletePop = async (req, res) => {
  try {
    const id = req.params.id;
    const pop = await Pop.findByPk(id);
    const alarm = await Alarm.findAll({ where: { pop_id: pop.id } });
    alarm.forEach((item) => {
      item.update({ pop_id: null });
      item.save();
    });
    await pop.destroy();
    res.status(200).json({ msg: 'Pop deletado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Internal Error!' });
  }
};

module.exports = { getPop, getAllPop, createPop, deletePop };
