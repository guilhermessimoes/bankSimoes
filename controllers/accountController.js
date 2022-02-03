const db = require('../models'); 
const formatMoney = require('../utils/formatMoney')
const validatorCPF =  require('cpf-cnpj-validator')

 const accountController = {
    accountGet: async(req,res)=>{
        const usuarioEncontrato = await db.Usuario.findByPk(req.session.user.user_id);

        const balance = formatMoney(usuarioEncontrato.balance); 
        res.render("account", {formAction:"/account", balance})
    },

    depositGet: async(_req,res)=>{      
        res.render("deposit", {formAction:"/account/deposit", error: undefined})
    },

    depositPost: async(req,res)=>{
        let depositUser = parseInt(req.body.deposit)
        console.log("depositUser", req.body)
        const usuarioEncontrato = await db.Usuario.findByPk(req.session.user.user_id);

        if (depositUser > 2000) {
            return res.render("deposit", {formAction:"/account/deposit", error: "Deposito maxímo de R$ 2.000,00"})            
        }

        depositUser+=usuarioEncontrato.balance

        await db.Usuario.update({ balance: depositUser}, {
            where: {
              id: usuarioEncontrato.id
            }
        });
        res.redirect("/account")
    },

    withdrawGet: async(_req,res)=>{      
        res.render("withdraw", {formAction:"/account/withdraw", error: undefined})
    },

    withdrawPost: async(req,res)=>{
        let withdrawUser = parseInt(req.body.withdraw)
        console.log("withdrawUser", req.body)
        const usuarioEncontrato = await db.Usuario.findByPk(req.session.user.user_id);

        if (usuarioEncontrato.balance < withdrawUser) {
            return res.render("withdraw", {formAction:"/account/withdraw", error: "Saldo insuficiente"}) 
        }

        usuarioEncontrato.balance-=withdrawUser 

        await db.Usuario.update({ balance: usuarioEncontrato.balance}, {
            where: {
              id: usuarioEncontrato.id
            }
        });

        res.redirect("/account")
    },
   

    transferGet: async(_req,res)=>{      
        res.render("transfer", {formAction:"/account/transfer", error: undefined})
    },

    transferPost: async(req,res)=>{
        let transferUser = parseInt(req.body.transfer)
        const withdrawCpf = req.body.cpf
        const usuarioEncontrato = await db.Usuario.findOne({where: {cpf: withdrawCpf}});

        if (!validatorCPF.cpf.isValid(withdrawCpf)) {            
            return res.render('transfer',{ formAction:"/account/transfer", error: 'CPF inválido'})
        }  

        if (!usuarioEncontrato) {
            return res.render("transfer", {formAction:"/account/transfer", error: "CPF não cadastrado."}) 
        }

        usuarioEncontrato.balance+=transferUser 

        await db.Usuario.update({ balance: usuarioEncontrato.balance}, {
            where: {
              cpf: usuarioEncontrato.cpf
            }
        });

        res.redirect("/account")
    },
}

module.exports = accountController