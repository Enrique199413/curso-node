const errorWhenIsNotNumerics = (a, b) => ({
    message: `Especifica valores númericos para la suma, ${a}, ${b}`,
    code: 400
});

const errorWhenEnviromentsNotExist = '{code:401}'

module.errorWhenIsNotNumerics = errorWhenIsNotNumerics;
module.errorWhenEnviromentsNotExist = errorWhenEnviromentsNotExist;
module.exports = module;