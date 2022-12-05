const User = require("../models/User");

const editOneUser = async (req, res) => {
    try{
        const  editUser = await User.findById(req.params.id);
        if(editUser){
            const updateUser = await User.findByIdAndUpdate(editUser._id, {
                name: req.body.name,
                idCompany: req.body.idCompany,
                role: req.body.role
            });
            await updateUser.save()
            res.status(201).json({"msg": 'Usuário editado com sucesso!', updateUser})
        } else {
            res.status(404).send({"msg": 'Página näo encontrada!'});
        }
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Error!");
    }
}

const getUsers = async (req, res) => {
    const { name, idCompany, role, ...others } = req.query;
    try{
        const users = await User.find({
            ...others
        });
        res.status(200).json(users);
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Error!");
    }
}

const deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({"msg": 'Usuário deletado com sucesso!'});
    }catch(err){
        console.error(err);
        res.status(500).send("Internal Error!");
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json({ "msg": "Usuário encontrado com sucesso!",user })
        } else {
            res.status(404).json({"msg": "Página não Encontrada"});
        }
    } catch (error) {
        console.error(error );
        res.status(500).send("Internal Error!");
    }

}

module.exports = {
    editOneUser,
    getUsers,
    deleteUser,
    getUser
}