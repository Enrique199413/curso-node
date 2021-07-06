const errorWhenIsNotNumeric = (a, b) => ({
    message: `por favor especifica valores númericos para la suma, ${a}, ${b}`,
    code: 400
})

const errorWhenEnviomentNotExist = '{"code":401}'

module.errorWhenIsNotNumeric = errorWhenIsNotNumeric
module.errorWhenEnviomentNotExist = errorWhenEnviomentNotExist
module.exports = module