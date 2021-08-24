const errorWhenIsNotNumeric = (a, b) => ({
    message: `Por favor especifica valores numericos para la suma: ${a}, ${b}`,
    code: 400
})

const errorWhenFetchingAll = ({
    message: `Error al intentar obtener todos los usuarios`,
    code: 400
})

const errorWhenEnvironmentNotExist = '{"code":401}'

module.errorWhenIsNotNumeric = errorWhenIsNotNumeric
module.errorWhenFetchingAll = errorWhenFetchingAll
module.errorWhenEnvironmentNotExist = errorWhenEnvironmentNotExist
module.exports = module