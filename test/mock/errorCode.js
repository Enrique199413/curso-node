const errorWhenIsNotNumeric = (a, b) => ({
    message: `por favor especifica valores numericos para la suma', ${a}, ${b}`,
    code: 400
})


const errorWhenEnviromentExist = '{"code": 401}'


module.errorWhenIsNotNumeric = errorWhenIsNotNumeric
module.exports = module