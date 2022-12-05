const Maintenance = require("../models/Maintenance");

const getMaintenance = async (req, res) => {
    try{
        const maintenance = await Maintenance.findById(req.params.id);
        res.status(200).json(maintenance)
    }catch(err){        
        console.error(err);
        res.status(500).send({"msg":"Internal Error!"});
    }
}

const getMaintenances = async (req, res) => {
    const { title, idCompany, dateMaintain, isConclude, ...others } = req.query
    try{
        const maintenances = await Maintenance.find({
            ...others
        });
        res.status(200).json(maintenances)
    }catch(err){        
        console.error(err);
        res.status(500).send({"msg":"Internal Error!"});
    }
}

const createMaintenance = async (req, res) => {
    try{
        const newMaintenance = new Maintenance({
            title: req.body.title,
            idCompany: req.body.idCompany,
            dateMaintain: req.body.dateMaintain,
            description: req.body.description,
        });
        const savedMaintenance = await newMaintenance.save();
        res.status(201).json({savedMaintenance, "msg": "Maintenance Created!"})
    }catch(err){        
        console.error(err);
        res.status(500).send({"msg":"Internal Error!"});
    }
}

const updateMaintenance = async (req, res) => {
    const { title, idCompany, dateMaintain, isConclude, description } = req.body;
    try{
        const updatedMaintenance = await Maintenance.findById(req.params.id);
        if(updatedMaintenance){
            updatedMaintenance.title = title,
            updatedMaintenance.idCompany = idCompany,
            updatedMaintenance.dateMaintain = dateMaintain,
            updatedMaintenance.isConclude = isConclude,
            updatedMaintenance.description = description
        } else{
            res.status(404).json({"msg": "Maintenance not found!"});
        }
        await updatedMaintenance.save();
        res.json(updatedMaintenance).status(201);
    }catch(err){        
        console.error(err);
        res.status(500).send({"msg":"Internal Error!"});
    }
}

const deleteMaintenance = async (req, res) => {
    try{
        await Maintenance.findByIdAndDelete(req.params.id);
        res.status(200).json({"msg": "Maintenance has been deleted!"});
    }catch(err){        
        console.error(err);
        res.status(500).send({"msg":"Internal Error!"});
    }
}

module.exports = {
    getMaintenance,
    getMaintenances,
    createMaintenance,
    updateMaintenance,
    deleteMaintenance
}