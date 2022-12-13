const router = require("express").Router();
const { createCredit, getAllCredits, getOneCredit, editCredit, deleteCredit, getCreditsGraph } = require("../controllers/creditController");
const Credit = require("../models/Credits");
const Installation = require("../models/InstallationNumber");
const Company = require("../models/Company");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

router.get("/", getAllCredits);
router.get("/:id", getOneCredit);
router.post("/add", createCredit);
router.put("/:id/edit", editCredit);
router.delete("/:id/delete", deleteCredit);
router.get("/graph", getCreditsGraph);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: "Gmail",
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

router.post("/:id/send-demo", async (req, res) => {
    const { email } = req.body
    try {
        const validDemo = await Credit.findById(req.params.id)
        const installation = await Installation.findById(validDemo.idInstallation)
        const company = await Company.findById(installation.idCompany);
        if (validDemo) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: company.email,
                subject: "Demonstração",
                text: `Acesse o link para ver a Demonstração e também conseguir o link de pagamento: https://sigus-app.vercel.app/demo/${validDemo._id}/`
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(401).json({ status: 401, "msg": "Email não enviado" })
                } else {
                    res.status(201).json({ status: 201, "msg": "Email enviado com sucesso!" })
                }
            })
        } else {
            res.status(401).json({ "msg": "Demonstração não existe!" })
        }
    } catch (error) {
        res.status(401).json({ error })
    }
})

module.exports = router