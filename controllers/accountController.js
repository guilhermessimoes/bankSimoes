const db = require('../models'); 
const formatMoney = require('../utils/formatMoney')

 const accountController = {
    accountGet: async(req,res)=>{
        const usuarioEncontrato = await db.Usuario.findByPk(req.session.user.user_id);

        const balance = formatMoney(usuarioEncontrato.balance); 
        res.render("account", {formAction:"/account", balance})
    },

    depositGet: async(_req,res)=>{      
        res.render("deposit", {formAction:"/account/deposit"})
    },

    depositPost: async(req,res)=>{
        let depositUser = parseInt(req.body.deposit)
        console.log("depositUser", req.body)
        const usuarioEncontrato = await db.Usuario.findByPk(req.session.user.user_id);

        if (depositUser > 2000) {
            return res.status(400).json({error: "Deposito maxímo de R$ 2.000,00"})
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
        res.render("withdraw", {formAction:"/account/withdraw"})
    },

    withdrawPost: async(req,res)=>{
        let withdrawUser = parseInt(req.body.withdraw)
        console.log("withdrawUser", req.body)
        const usuarioEncontrato = await db.Usuario.findByPk(req.session.user.user_id);

        if (usuarioEncontrato.balance < withdrawUser) {
            return res.status(400).json({error: "Saldo Insuficiente"})
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
        res.render("transfer", {formAction:"/transfer"})
    },

    transferPost: async(req,res)=>{
        let withdrawUser = parseInt(req.body.transfer)
        console.log("withdrawUser", req.body)
        const usuarioEncontrato = await db.Usuario.findByPk(req.session.user.user_id);

        if (usuarioEncontrato.balance < withdrawUser) {
            return res.status(400).json({error: "Saldo Insuficiente"})
        }

        usuarioEncontrato.balance-=withdrawUser 

        await db.Usuario.update({ balance: usuarioEncontrato.balance}, {
            where: {
              id: usuarioEncontrato.id
            }
        });

        res.redirect("/account")
    },
}

module.exports = accountController