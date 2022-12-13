const { application } = require('express');

const router = require('express').Router();
const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);
const uuid = require('uuid');
const Credit = require('../models/Credits');



router.post('/:id/payment', async (req, res) => {
    try {
        const credit = await Credit.findById(req.params.id);
        const session = await stripe.checkout.sessions.create({
            success_url: `https://sigus-app.vercel.app/success`,
            cancel_url: `https://sigus-app.vercel.app/cancel`,
            mode: "payment",
            payment_method_types: ['boleto'],
            payment_method_options: {
                boleto: {
                    expires_after_days: 7
                }
            },
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "brl",
                        product_data: {
                            name: `Minera Engenharia ${credit.month}`,
                            description: `Energia Solar ${credit.month}`,
                        },
                        unit_amount: (credit.valuePayment + 1) * 100,
                    }
                }
            ],
        });

        res.send({ url: session.url })
    } catch (error) {
        console.log(error)
        res.send("Internal Error")
    }
})

router.post("/payment-intent", async (req, res) => {
    const { token } = await stripe.createToken();

    const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ['card', 'boleto', 'pix'],
        payment_method_options: {
            boleto: {
                expires_after_days: 7
            }
        },
        amount: (req.body.valuePayment + 1) * 100,
        mode: "payment",
        currency: "brl",
        description: `Minera Engenharia ${req.body.month}`,
        receipt_email: req.body.email,
        source: token
    });

    return paymentIntent;
});

module.exports = router;