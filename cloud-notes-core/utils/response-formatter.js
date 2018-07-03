// Immanuel Amirtharaj
// response-formatter.js

module.exports = function(code, err, body) {

    var status = "success";

    let errMessage = "";
    if (err) {
        errMessage = err;
        status = "failure";
    }

    const res = {
        "meta": {
            "type": status,
            "code": code,
            "message": err,
        },
        "data": body,
    };  

    return res;
}