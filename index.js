const express = require('express');
const setupAuthMiddleware = require('./middlewares/index')
const { loginRouter } = require('./login/login.router')
const { usersRouter } = require('./users/users.router')
const port = 3000;
let app = express();

setupAuthMiddleware(app)

app.use('/api/login', loginRouter)
app.use('/api/register', usersRouter)

app.listen(port, () => {
    console.log(`Estamos en el puerto: ${port}`);
});

module.exports = app;