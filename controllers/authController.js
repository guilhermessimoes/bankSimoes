const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const db = require('../models');
const validatorCPF =  require('cpf-cnpj-validator')

const authController = {
    signupGet: async(_req,res)=>{
        res.render("signup", {formAction:"/signup", message: undefined})
    },
    
    signupPost: async(req,res) =>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            res.render("signup", {formAction:"/signup",  alert: alert })
            return            
        }

        const nomeUsuario = req.body.nome;
        const cpfUsuario = req.body.cpf;
        const senhaUsuario = req.body.senha;
        const confirmSenha = req.body.confirmacaoSenha;
        const salt = bcrypt.genSaltSync(10);
        const senhaCriptografada = bcrypt.hashSync(req.body.senha, salt);    

        if (senhaUsuario !== confirmSenha) {          
            return res.render("signup", { formAction:"/login/signup", message: "Senhas não conferem" });
        }
        
        if (!validatorCPF.cpf.isValid(cpfUsuario)) {            
          return res.render('signup',{ formAction:"/login/signup", message: 'CPF inválido'})
        }      

        if (await db.Usuario.findOne({where: { cpf: cpfUsuario}})) {            
            return res.render('signup',{ formAction:"/login/signup", message: 'CPF já existe'})
        }
        
        try {  
          const user = await db.Usuario.create({
              nome: nomeUsuario,
              cpf: cpfUsuario,
              senha: senhaCriptografada
          })
          
          await req.flash('success', "Registro criado com sucesso")

          return res.redirect("/login");
        } catch (error) {
          res.status(400).send('falha na criação do usuario.')
        }

    },

    loginGet: async(req,res)=>{
      const flashMessage = await req.consumeFlash('success')
        res.render("login", {formAction:"/", flashMessage: flashMessage }) 
    },

    loginPost: async(req,res)=>{
        let listaDeErros = validationResult(req)
        if(!listaDeErros.isEmpty()){
            const alert = listaDeErros.array()
            res.render("login", {alert: alert, formAction:"/"})
            return            
        }

        const { cpf, senha } = req.body;

        const user = await db.Usuario.findOne({ where: { cpf: cpf } })
          .then((user) => {
            return user;            
          })
          .catch((err) => {
            console.log(err);
            return undefined;
          });
          
        
         
        if (!user) {
          return res.render("login", { formAction:"/", error: "CPF ou senha incorretos" });
        }
      
        const comparePassword = bcrypt.compareSync(senha, user.senha);
        if (!comparePassword) {
          return res.render("login", { formAction:"/", error: "CPF ou senha incorretos" });
        }
        

        //Adicionar session 
        req.session.user = {
          user_id: user.id,
          name: user.nome,
          cpf: user.cpf,
        };
        
        res.redirect("/account",)
    },
}

module.exports = authController