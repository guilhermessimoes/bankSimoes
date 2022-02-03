var { check } = require("express-validator");

const loginValidator = [
    check("cpf").isLength({min:3, max:40}).withMessage("Preencha seu CPF."),
    check("senha").notEmpty().withMessage("Preencha o campo senha."),
  ]

module.exports = {loginValidator}