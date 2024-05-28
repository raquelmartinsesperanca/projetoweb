const Cliente = require('../models/Cliente')
const bcrypt = require('bcrypt')

module.exports = class ClienteController{
    static async registrar(req, res){
        const nome = req.body.nome
        const email = req.body.email
        const telefone = req.body.telefone
        const senha = req.body.senha
        const senhaconf = req.body.senhaconf

        if(!nome){
            res.status(422).json({mensagem: "O nome é obrigatório"})
        }

        if(!email){
            res.status(422).json({mensagem: "O email é obrigatório"})
            return
        }

        if(!telefone){
            res.status(422).json({mensagem: "O telefone é obrigatório"})
            return
        }

        if(!senha){
            res.status(422).json({mensagem: "O senha é obrigatório"})
            return
        }

        if(!senhaconf){
            res.status(422).json({mensagem: "Confirme a senha"})
            return
        }
    }
}
