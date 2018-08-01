var elasticsearch = require('elasticsearch');
var config = require("./../../config");
var assert = require('assert');

var client = new elasticsearch.Client({
    host: `https://${config.elasticUser}:${config.elasticPW}@${config.elasticHost}:${config.elasticPort}`
})

/**
 * @param {string} email is the email address
 * @param {function} hitFunc is a function which is executed when the passed email address exits in the elasticsearch
 * @param {function} missFunc is a function which is executed when the passed email address doesn't exist in the elasticsearch
 * @param {object} next is pointing to the next middleware function
 */
module.exports = function(email, hitFunc, missFunc, next){
    client.search({
        index: 'wavelearning',
        type: "students",
        body: {
            query: {
                term: { //term query for exact match. On the contrary, match query for fuzzy macth
                    email
                }
            }
        }
    }, function (err, data){
        if(err) return next(err);

        assert.ok(data.hits.total === 0 || data.hits.total === 1, "Exact macth is wrong!!");

        if(data.hits.total === 1){
            hitFunc(data);
        } else{
            missFunc();
        }
    })
}
