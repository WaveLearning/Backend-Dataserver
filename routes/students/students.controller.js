var search = require("./../helper/search");

exports.getAllStudents = function(req, res, next){
    let matchQuery = {
        match_all: {
        }
    };

    search(req, res, next, matchQuery, (students) => {res.json(students)});
}

exports.searchStudentsByField = function(req, res, next){
    //Verify the query string exists
    if(!req.query){
        let err = new Error("Where's your query??")
        err.status = 400;
        return next(err);
    }

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
    search(req, res, next, matchQuery, (students) => {res.json(students)});
}

exports.searchStudentsGlobally = function(req, res, next){
    //Verify the query string exists
    if(!req.query){
        let err = new Error("Where's your query??")
        err.status = 400;
        return next(err);
    }

    let query = req.query.query;

    if(!query){
        let err = new Error("Bad request: the query string 'query=xxx' is expected");
        err.status = 400;
        return next(err);
    }

    let queryString = {
        query_string: {
            query
        }
    };
    search(req, res, next, queryString, (students) => {res.json(students)});
}
