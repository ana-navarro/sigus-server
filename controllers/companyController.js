const Company = require('../models/Company');
const Address = require('../models/Address');
const mongoose_delete = require('mongoose-delete');

const createCompany = async (req, res) => {
  try {
    const newCompany = Company.create({
      name: req.body.name,
      phone: req.body.phone,
      cnpj: req.body.cnpj,
      email: req.body.email
    });
    res.status(201).json({ "msg": "Empresa criada com sucesso!", newCompany });
  } catch (err) {
    console.error(err);
    res.status(500).send({ "msg": "Internal Error!" });
  }
};

const updateCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      phone: req.body.phone,
      cnpj: req.body.cnpj,
      email: req.body.email,
    });
    res.json({ "msg": "Empresa atualizada com sucesso!", updatedCompany }).status(201)
  } catch (err) {
    console.error(err);
    res.status(500).send({ "msg": "Internal Error!" });
  }
}

const deleteCompany = async (req, res) => {
  try {
    await Company.deleteById(req.params.id);
    res.status(201).json({ "msg": "Empresa deletada com sucesso!" })
  } catch (err) {
    console.error(err);
    res.status(500).send({ "msg": "Internal Error!" });
  }
  res.status(201);
}

const getOneCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json({ "msg": "Empresa encontrado com sucesso!", company });
  } catch (err) {
    console.error(err);
    res.status(500).send({ "msg": "Internal Error!" });
  }
}



const getCompanies = async (req, res) => {
  try {
    const companiesList = await Company.find()
    res.status(200).json(companiesList);

  } catch (err) {
    console.error(err);
    res.status(500).send({ "msg": "Internal Error!" });
  }
}

module.exports = {
  createCompany,
  updateCompany,
  deleteCompany,
  getOneCompany,
  getCompanies,
}
