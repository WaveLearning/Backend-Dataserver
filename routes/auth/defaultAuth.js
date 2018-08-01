var authByEmail = require("./authByEmail");

/*
* Default auth method is very simple. It just macthes the email address, and ignores the password
*/
module.exports = function(req, res, next, credentials){
    let hitFunc = (data) => {
        res.json({
            status_code: 200,
            data: data.hits.hits[0]._source
        })
    }

    let missFunc = () => {
        res.json({
            status_code: 401,
            data: "User not found"
        })
    }

    authByEmail(credentials.email, hitFunc, missFunc);
}
