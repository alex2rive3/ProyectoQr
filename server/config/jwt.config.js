const jwt = require("jsonwebtoken");
const secret = "clave sercret jwt";
module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            req.user = payload
            next();
        }
    });
}

module.exports.sigUp = (req, res, next) => {
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false })
        } else {
            req.user = payload
            next()
        }
    });
}
