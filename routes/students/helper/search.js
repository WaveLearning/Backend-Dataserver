var elasticsearch = require('elasticsearch');
var config = require("./../../../config");

var client = new elasticsearch.Client({
    host: `https://${config.elasticUser}:${config.elasticPW}@${config.elasticHost}:${config.elasticPort}`
})

module.exports = function(req, res, next, queryObj){
    let students = [];
    let count = 0;
    client.search({
        index: 'wavelearning',
        type: "_doc",
        scroll: '60s',
        size: 10000,
        body: {
            query: queryObj
        }
    }, function getMoreUntilDone(err, data){
        if(err) next(err);

        if(data != null && data.hits != null){
            data.hits.hits.forEach(hit => {
                students.push(hit._source);
                count++;
            })
            if(data.hits.total !== count){
                //now we can call scroll over and over
                client.scroll({
                    scrollId: data._scroll_id,
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
