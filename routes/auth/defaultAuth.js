var elasticsearch = require('elasticsearch');
var config = require("./../../config");
var assert = require('assert');

var client = new elasticsearch.Client({
    host: `https://${config.elasticUser}:${config.elasticPW}@${config.elasticHost}:${config.elasticPort}`
})

/*
* Default auth method is very simple. It just macthes the email address, and ignores the password
*/
module.exports = function(req, res, next, credentials){
    client.search({
        index: 'wavelearning',
        type: "students",
        body: {
            query: {
                term: { //term query for exact match. On the contrary, match query for fuzzy macth
                    email: credentials.email
                }
            }
        }
    }, function (err, data){
        if(err) return next(err);

        assert.ok(data.hits.total === 0 || data.hits.total === 1, "Exact macth is wrong!!");
        if(data.hits.total === 1){
            res.json({
                status_code: 200,
                data: data.hits.hits[0]._source
            })
        } else{
            res.json({
                status_code: 401,
                data: "User not found"
            })
        }
    })
}
