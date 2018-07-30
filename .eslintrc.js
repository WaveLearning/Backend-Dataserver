module.exports = {
    "env": {
        "es6": true, //For ES6 globale variables
        "node": true
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,   //For ES6 syntax
        "sourceType": "script"
    },
    "rules": {
        "no-console": [
            "error",
            {
                "allow": ["warn", "error", "info"]
            }
        ]
    }
};