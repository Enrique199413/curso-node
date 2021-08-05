const express = require('express');
const setupAuthMiddleware = require('./middlewares/index')
const { loginRouter } = require('./login/login.router')
const port = 3000;
let app = express();

setupAuthMiddleware(app)

app.use('/api/login', loginRouter)

app.listen(port, () => {
    console.log(`Estamos en el puerto: ${port}`);
});

module.exports = app;