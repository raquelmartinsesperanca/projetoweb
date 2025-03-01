const Cliente = require('../models/Cliente')
const bcrypt = require('bcrypt')
const criarClienteToken = require('../helpers/cria-cliente-token')

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

        /*Verifica se Cliente jṕa esta cadastrado  */
     
        const clienteExitste = await Cliente.findOne({email: email})

        if (clienteExiste){
            res.status(422).json({mensagem: "E-mail  já cadastrado"})
            return
        } 

        /* Criação de senha */
        const salt = await bcryot.genSalt(12)
        const senhaHash = await bcrypt.hash(senha,salt)

        /* Adicionando o cliente ao bd */
        const cliente = new Cliente({nome, email, telefone, senha: senhaHash})

        try{
            const novoCliente = await cliente.save()
            await criarClienteToken(novoCliente, req, res)
        } catch(erro){
            res.status(500).json({mensagem:erro})
        }
    }   /* Fim do método registrar */ 

    /* MÉTODO LOGIN */
    static async login(req,res){
        const {email, senha} = req.body
        if(!email){
            res.status(422).json({
                mensagem: "O e-mail é obrigatório"})
            return
        }
        if(!senha){
            res.status(422).json({
                mensagem: "A senha é obrigatória"})
                return
        }

        const cliente = await Cliente.findOne({email: email})

        if(!cliente){
            res.status(422).json({
                mensagem: "Usuário não encontrado!"})
                return
        }
        /* Verifica se senha confere com senha registrada */

    const verificaSenha = 
    await bcrypt.compare(senha,cliente.senha)
    if(!verificaSenha){
        res.status(422).json({mensagem: "Senha não confere"})
        return
    }
    await createUserToken(cliente,req,res)
    }/* fim do login */
}/* fim da classe ClienteController */

