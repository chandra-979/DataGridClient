const express = require('express');
const routing = express.Router();
const dbModule = require('../model/register');


//routing for Registration - EXPECTS USER DATA!!
routing.post('/register',  (req, res, next) => {
    let title = req.body.title;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let acceptTerms = req.body.acceptTerms;
    console.log(firstName,lastName)
    console.log("request for Registration received!!")
    let result = dbModule.Register(title,firstName,lastName,email, password,confirmPassword,acceptTerms)
    console.log(result)
    if (result){
        res.json({ "message": "User successfully register with email: " + result });
        next(result)
    }
    else {
        let err = new Error();
        err.status = 401;
        err.message = "Unauthorized access!!"
        next(err);
    }
})

//Routing for login tab
routing.get('/login/:email/:password',(req, res, next) => {
    let email = req.params.email;
    let password = req.params.password;
    let tlist = dbModule.logInData(email,password)
    if (tlist && tlist.length>0)
        res.json(tlist);
    else {
        let err = new Error();
        err.status = 404;
        err.message = "No details found!!"
        next(err);
    }

})
module.exports = routing;