const router = require("express").Router();
const { getCompanies, createCompany, updateCompany, deleteCompany, getOneCompany } = require("../controllers/companyController");
const { getClientsPerCompany } = require("../controllers/clientController");
const Installation = require("../models/InstallationNumber");
const Company = require("../models/Company");
const Address = require("../models/Address");

router.get("/", getCompanies);
router.post("/add", createCompany);
router.put("/:id/edit", updateCompany);
router.delete("/:id/delete", deleteCompany);
router.get("/:id", getOneCompany);
router.get("/:id/users", getClientsPerCompany);

router.get("/:id/address", async (req, res) => {
    const { ...others } = req.query;
    try {
        const address = await Address.find({
            ...others,
        }).where('idCompany').equals(req.params.id);
        res.status(200).json(address);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Error!");
    }
});

router.post('/:id/address/add', async (req, res) => {
    try {
        const newCompanyAddress = await Address.create({
            street: req.body.street,
            number: req.body.number,
            moreInfo: req.body.moreInfo,
            block: req.body.block,
            state: req.body.state,
            city: req.body.city,
            country: req.body.country,
            postalCode: req.body.postalCode,
            idCompany: req.params.id,
        });
        res.status(201).json({ "msg": "Endereço criado com sucesso!", newCompanyAddress });
    } catch (error) {
        console.log(error);
        res.status(500).send({ "msg": "Internal Error!" });
    }
});

router.get('/:id/address', async (req, res) => {
    const { ...info } = req.query;
    try {
        const address = await Address.find({ ...info }).where('idCompany').equals(req.params.id);
        res.status(200).json(address[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send({ "msg": "Internal Error!" });
    }
});

router.get('/:id/address/info', async (req, res) => {
    try {
        const address = await Address.findById(req.params.id)
        res.status(200).json(address);
    } catch (err) {
        console.error(err);
        res.status(500).send({ "msg": "Internal Error!" });
    }
})

router.delete('/:id/address/delete', async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Deletado com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ "msg": "Internal Error!" });
    }
})



router.put('/:id/address/edit', async (req, res) => {
    try {
        const updateAddress = await Address.findByIdAndUpdate(req.params.id, {
            street: req.body.street,
            number: req.body.number,
            moreInfo: req.body.moreInfo,
            block: req.body.block,
            state: req.body.state,
            city: req.body.city,
            country: req.body.country,
            postalCode: req.body.postalCode,
        })
        res.json({ "msg": "Endereço atualizada com sucesso!", updateAddress }).status(201)
    } catch (err) {
        console.error(err);
        res.status(500).send({ "msg": "Internal Error!" });
    }
})

router.get("/:id/installations", async (req, res) => {
    const { numberInstallation, ...others } = req.query;
    try {
        const installation = await Installation.find({
            ...others,
        }).where('idCompany').equals(req.params.id);
        if (installation) {
            res.status(200).json(installation);
        } else {
            res.status(200).json({ "msg": "Não possui instalações Cadastradas!" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Error!");
    }
});

module.exports = router;