var elasticsearch = require('elasticsearch');
var config = require("./../../config");
var assert = require('assert');

var client = new elasticsearch.Client({
    host: `https://${config.elasticUser}:${config.elasticPW}@${config.elasticHost}:${config.elasticPort}`
})

/*
* Default method for sign up is dumb, verifying student exists or not just by email only and some missing info faked
*/
module.exports = function(req, res, next){
    let signupForm = req.body;
    client.search({
        index: 'wavelearning',
        type: "students",
        body: {
            query: {
                term: {
                    email: signupForm.email
                }
            }
        }
    }, function (err, data){
        if(err) return next(err);

        assert.ok(data.hits.total === 0 || data.hits.total === 1, "Exact macth is wrong!!");
        if(data.hits.total === 1){
            res.json({
                status_code: 403,
                data: "The student already exists"
            })
        } else{
            let doc = {
                    emplyee_id: parseInt(Math.random() * 1000000),
                    first_name: signupForm.first_name,
                    last_name: signupForm.last_name,
                    email: signupForm.email,
                    skills: [],
                    job_title: 'Developer Summer Intern',
                    location: "320 Front St W, Toronto",
                    github: signupForm.github,
                    linkedin: signupForm.linkedin,
                    school: ""
            }

            client.index({
                index: 'wavelearning',
                type: 'students',
                body: doc
            }).then(() => {
                res.json({
                    status_code: 200,
                    data: doc
                })
            }).catch((err) => {
                next(err);
            })
        }
    })
}
