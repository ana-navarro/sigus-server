const Company = require('../models/Company')
const Credit = require('../models/Credits')
const Payment = require('../models/Payment')

const TransactionService = () => {
    const processPayment = async ({
        idCredit,
        paymentType,
        client,
        billing,
        creditCard
    }) => {
        const credit = Credit.findOne(idCredit)
        if (!credit) {
            throw `Crédito  ${idCredit} was not found.`
        }
        const paymentTransaction = await Payment.create({
            name: client.name,
            email: client.email,
            phone: client.phone,
            documentClient: client.documentClient,

            addressline: billing.addressline,
            neighborhood: billing.neighborhood,
            city: billing.city,
            uf: billing.uf,
            country: billing.country,
            postalCode: billing.postalCode,

            credit: credit,
            price: credit.price,
            status: "started",
            paymentType: paymentType,
            processResponse: processResponse,
        });

        stripe.transaction.create();

        return paymentTransaction;
    }
}

module.exports = TransactionService;