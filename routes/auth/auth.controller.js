var authenticate = require("./defaultAuth");
var signup = require("./defautSignup");

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

exports.signup = function(req, res, next){
    //Todo adding validation for request body
    //assume the request body is in the format of {first_name:"..", last_name:"...", email:"..", github:"..", linkedin: "...", password: ".."}
    signup(req, res, next);
}

