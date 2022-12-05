const Client = require("../models/Client");

const getClientsPerCompany = async (req, res) => {
    const { name, email, companyId, ...others } = req.query;
    try {
        const users = await Client.find({
            ...others,
        }).where('idCompany').equals(req.params.id);
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(200).json({ "msg": "Não possui usuários!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Error!");
    }
}
const getClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (client) {
            res.status(200).json(client)
        } else {
            res.status(404).json({ "msg": "Cliente não Encontrado!" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error!")
    }
}
const getAllClient = async (req, res) => {
    const { ...all } = req.query;
    try {
        const clients = await Client.find({ ...all });
        res.status(200).json(clients);
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error!")
    }
}
const createClient = async (req, res) => {
    try {
        const newClient = await Client.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            cpf: req.body.cpf,
            email: req.body.email,
            idCompany: req.body.idCompany
        });
        res.status(201).json({ newClient, "msg": "Cliente criado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error!")
    }
}

const editClient = async (req, res) => {
    try {
        const updateClient = await Client.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            cpf: req.body.cpf,
            email: req.body.email,
            idCompany: req.body.idCompany
        });
        res.status(201).json({ updateClient, "msg": "Cliente editado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error!")
    }
}
const deleteClient = async (req, res) => {
    try {
        await Client.findByIdAndDelete(req.params.id);
        res.status(200).status({ "msg": "Cliente deletado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error!")
    }
}

module.exports = {
    getClientsPerCompany,
    getClient,
    getAllClient,
    createClient,
    editClient,
    deleteClient
}