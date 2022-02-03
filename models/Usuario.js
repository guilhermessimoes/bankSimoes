module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define("Usuario", {
        nome: DataTypes.STRING(40),
        cpf: DataTypes.STRING(40),
        senha: DataTypes.STRING(40),
        balance: DataTypes.INTEGER
    }, {
        tableName: "usuarios",
        timestamps: true,
        paranoid: true
    });
    return Usuario
}