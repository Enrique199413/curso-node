const bodyParser = require("body-parser");
const express = require("express");
const {userRouter} = require('./users/users.router');
require('dotenv').config()
const session = require("express-session");
const passport = require("passport");



let app = express()
app.use(bodyParser.json())



app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRouter)
const port = 8080;


app.listen(port, () => {
    console.log('server on port 8080');
})

module.exports = app