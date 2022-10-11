const Users = require('./User')

const User = {
    get: async (req,res) => {
        const { id } = req.params
        const user = await Users.findOne({_id: id})
        res.status(200).send(user)
    },
    list: async (req, res) => {
        const users = await Users.find()
        res.status(200).send(users)
    },
    create: async (req,res) => {
        console.log(req.body)
        const user = new Users(req.body)
        const saveUser = await user.save()
        res.status(201).send(saveUser._id)
    },
    update: async (req,res) => {
        const { id } = req.params
        const user = await Users.findOne({_id: id })
        Object.assign(user, req.body)
        await user.save()
        res.status(204).send('modificado')
    },
    destory: async (req,res) => {
        const { id } = req.params
        const user = await Users.findOne({_id: id})
        if(user){
            user.remove()
        }
        res.sendStatus(204)
    }
}


module.exports = User;