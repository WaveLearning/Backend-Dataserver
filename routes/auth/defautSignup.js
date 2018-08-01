var authByEmail = require("./helper/authByEmail");

/*
* Default method for sign up is dumb, verifying student exists or not just by email only and some missing info faked
*/
module.exports = function (req, res, next) {
    let signupForm = req.body

    let email = signupForm.email;

    let hitFunc = () => {
        res.json({
            status_code: 403,
            data: "The student already exists"
        })
    };

    let missFunc = (client) => {
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

    authByEmail(email, hitFunc, missFunc, next);
}
