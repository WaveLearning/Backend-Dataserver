// var elasticsearch = require('elasticsearch');
// var config = require("../../config");

// var client = new elasticsearch.Client({
//     host: `https://${config.elasticUser}:${config.elasticPW}@${config.elasticHost}:${config.elasticPort}`
// })

var search = require("./helper/search");

exports.getAllStudents = function(req, res, next){
    let matchQuery = {
        match_all: {
        }
    };

    search(req, res, next, matchQuery);
}

exports.searchStudents = function(req, res, next){

    let field = req.query.field;
    let query = req.query.query;

    if(!field || !query){
        let err = new Error("Bad request: the query string 'field=xxx&&query=xxx' is expected");
        err.status = 400;
        return next(err);
    }

    let matchQuery = {
        match: {}
    };
    matchQuery['match'][field] = query;
    search(req, res, next, matchQuery);
}
