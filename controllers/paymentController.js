const Payment = require('../models/Payment');
const TransactionService = require('../services/PaymentService');

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Error!");
    }
}

const getOnePayments = async (req, res) => {
    try {
        const payments = await Payment.findById(req.params.id);
        res.status(200).json({ payments, "msg": "Pagamento encontrado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Error!");
    }
}

const createPayment = async (req, res) => {
    try {
        const service = new TransactionService
        const response = await service.process({
            idCredit: req.body.idCredit,
            paymentType: "billet",
            price: req.body.price,
            processResponse: req.body.processResponse,
            client: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                documentClient: req.body.documentClient,
            },
            billing: {
                addressline: req.body.addressline,
                neighborhood: req.body.neighborhood,
                city: req.body.city,
                uf: req.body.uf,
                country: req.body.country,
                postalCode: req.body.postalCode,
            },
        });

        res.status(201).json({ response, "msg": "Pagamento criado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Error!");
    }
}

const updatePayment = async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            addressline: req.body.addressline,
            neighborhood: req.body.neighborhood,
            city: req.body.city,
            uf: req.body.uf,
            country: req.body.country,
            postalCode: req.body.postalCode,
            credit: req.body.credit,
            price: req.body.price,
            phone: req.body.phone,
            email: req.body.email,
            status: req.body.status,
            paymentType: req.body.paymentType,
            processResponse: req.body.processResponse,
            documentClient: req.body.documentClient
        });

        const sertvice
        res.status(201).json({ payment, "msg": "Pagamento editado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Error!");
    }
}

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params.id;
        const payment = await Payment.findByIdAndDelete(id)
        res.status(200).json({ "msg": "Pagamento deletado com sucesso!" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Error!");
    }
}


module.exports = {
    getPayments,
    createPayment,
    updatePayment,
    deletePayment,
    getOnePayments
}