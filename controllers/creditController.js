const Credit = require("../models/Credits");
const mongoose_delete = require('mongoose-delete');

const getUsedBalance = (actualBalance, previousBalance) => {
    const usedBalance = actualBalance - previousBalance;
    return usedBalance
}

const getTotalInjected = (injected, usedBalance) => {
    const totalInjected = injected - usedBalance;
    return totalInjected
}

const getValueEnergy = (totalInjected, valueKwh) => {
    const valueEnergy = totalInjected - valueKwh;
    return valueEnergy
}

const getValueDiscount = (valueEnergy, discount) => {
    const percentageDiscount = discount / 100
    const valueDiscount = valueEnergy * percentageDiscount
    return valueDiscount;
}

const getValuePayment = (valueEnergy, valueDiscount) => {
    const valuePayment = valueEnergy - valueDiscount;
    return valuePayment
}

const createCredit = async (req, res) => {
    const {
        idInstallation,
        month,
        consumed,
        discount,
        previousBalance,
        actualBalance,
        injected,
        valueKwh,
        expirationDate,
        distribuition } = req.body;
    const usedBalance = getUsedBalance(actualBalance, previousBalance);
    const totalInjected = getTotalInjected(injected, usedBalance);
    const valueEnergy = getValueEnergy(totalInjected, valueKwh);
    const valueDiscount = getValueDiscount(valueEnergy, discount);
    const valuePayment = getValuePayment(valueEnergy, valueDiscount);
    try {
        const newCredit = Credit.create({
            idInstallation,
            month,
            consumed,
            discount,
            previousBalance,
            actualBalance,
            injected,
            valueKwh,
            expirationDate,
            distribuition,
            usedBalance,
            totalInjected,
            valueEnergy,
            valueDiscount,
            valuePayment
        });
        res.status(201).json({ newCredit, "msg": "Crédito criado com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}
const getAllCredits = async (req, res) => {
    try {
        const credit = await Credit.find();
        res.status(200).json(credit);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}
const getOneCredit = async (req, res) => {
    try {
        const credit = await Credit.findById(req.params.id);
        res.status(200).json(credit);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}
const editCredit = async (req, res) => {
    const {
        idInstallation,
        month,
        consumed,
        discount,
        previousBalance,
        actualBalance,
        injected,
        valueKwh,
        expirationDate,
        distribuition } = req.body;
    const usedBalance = getUsedBalance(actualBalance, previousBalance);
    const totalInjected = getTotalInjected(injected, usedBalance);
    const valueEnergy = getValueEnergy(totalInjected, valueKwh);
    const valueDiscount = getValueDiscount(valueEnergy, discount);
    const valuePayment = getValuePayment(valueEnergy, valueDiscount);
    try {
        const updateCredit = await Credit.findByIdAndUpdate(req.params.id, {
            idInstallation,
            month,
            consumed,
            discount,
            previousBalance,
            actualBalance,
            injected,
            valueKwh,
            expirationDate,
            distribuition,
            usedBalance,
            totalInjected,
            valueEnergy,
            valueDiscount,
            valuePayment
        });
        res.status(201).json({ "msg": "Crédito atualizado com sucesso!", updateCredit })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}
const deleteCredit = async (req, res) => {
    try {
        await Credit.deleteById(req.params.id);
        res.status(201).json({ "msg": "Crédito deletado com sucesso!" })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

const getCreditsGraph = async (req, res) => {
    const { idInstallationNumber, usedBalance, actualBalance, previousBalance, month } = req.query
    try {
        await Credit.find({
            idInstallationNumber, usedBalance, actualBalance, previousBalance, month
        });
        res.status(200).json(credit);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
}

module.exports = {
    createCredit,
    getAllCredits,
    getOneCredit,
    editCredit,
    deleteCredit,
    getCreditsGraph
}