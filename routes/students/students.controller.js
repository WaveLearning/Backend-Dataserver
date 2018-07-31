var elasticsearch = require('elasticsearch');
var config = require("../../config");

var client = new elasticsearch.Client({
    host: `http://${config.elasticUser}:${config.elasticPW}@${config.elasticHost}:${config.elasticPort}`
})

exports.getAllStudents = function(req, res, next){
    let students = [];
    let count = 0;
    client.search({
        index: 'wavelearning',
        type: "_doc",
        scroll: '60s',
        size: 10000,
        body: {
            query: {
                match_all:{
                }
            }
        }
    }, function getMoreUntilDone(err, res){
        if(err) next(err);

        if(res != null && res.hits != null){
            res.hits.hits.forEach(hit => {
                students.push(hit);
            })
            count++;
            if(res.hits.total !== count){
                //now we can call scroll over and over
                client.scroll({
                    scrollId: res._scroll_id,
                    scroll: '60s'
                }, getMoreUntilDone)
            } else {
                res.json(students);
            }
        } else {
            next(new Error("Error: response returned a null value from getAllStudents"));
        }
    })
}
