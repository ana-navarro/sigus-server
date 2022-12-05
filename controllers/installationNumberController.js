const InstallationNumber = require('../models/InstallationNumber');
const mongoose_delete = require('mongoose-delete');

const createInstallationNumber = async (req, res) => {
    try {
        const newInstallationNumber = InstallationNumber.create({
            numberInstallation: req.body.numberInstallation,
            idCompany: req.body.idCompany
        });
        res.status(201).json({ newInstallationNumber, "msg": "Número de Instalação cadastrado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error!");
    }
}

const getAllInstallationNumbers = async (req, res) => {
    try {
        const installations = await InstallationNumber.find();
        res.status(200).json(installations);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Error!");
    }
}

const getOneInstallationNumbers = async (req, res) => {
    try {
        const installation = await InstallationNumber.findById(req.params.id);
        if (installation) {
            res.json(installation).status(200);
        } else {
            res.json({ "msg": "Número de Instalação não foi encontrado!" }).status(404);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Error!");
    }
}

const editOneInstallationNumbers = async (req, res) => {
    try {
        const updatedInstallationNumbers = await InstallationNumber.findByIdAndUpdate(req.params.id, {
            numberInstallation: req.body.numberInstallation,
            idCompany: req.body.idCompany
        });
        res.status(201).json({ "msg": "Número de Instalação atualizada com sucesso!", updatedInstallationNumbers })
    } catch (error) {
        console.error(err);
        res.status(500).send("Internal Error!");
    }
}
const deleteOneInstallationNumber = async (req, res) => {
    try {
        await InstallationNumber.deleteById(req.params.id)
        res.json({ "msg": "Número de Instalação deletado com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Internal Error!" })
    }
}

module.exports = {
    createInstallationNumber,
    getAllInstallationNumbers,
    getOneInstallationNumbers,
    editOneInstallationNumbers,
    deleteOneInstallationNumber
}