var authenticate = require("./defaultAuth");

exports.login = function(req, res, next){
    let credentials = req.body;

    //validate the request
    if(!credentials || !credentials.email || !credentials.password){
        let err = new Error("Bad request: {\"email\": \"\", \"password\": \"\"} is expected in the request body")
        err.status = 400;
        return next(err);
    }

    authenticate(req, res, next, credentials);
}

// exports.signup = function(req, res, next){

// }

