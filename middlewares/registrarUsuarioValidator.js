var { check } = require("express-validator");

const registrarUsuarioValidator = [
    check("nome").isLength({min:3, max:40}).withMessage("Preencha o campo nome."),
    check("cpf").notEmpty().withMessage("Preencha o campo CPF."),
    check("senha").notEmpty().withMessage("Preencha o campo senha."),
    check("confirmacaoSenha").notEmpty().withMessage("Preencha o campo confirmação de senha.")
  ]

module.exports = {registrarUsuarioValidator}