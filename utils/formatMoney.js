
var formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

function formatMoney(money) {
    return formatter.format(money)    
}

module.exports = formatMoney