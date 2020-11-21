const authenticator = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic') === -1) {
        return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end()
    }

    const credentials = req.headers.authorization.split(' ')[1]; 
    const [username, password] = Buffer.from(credentials, 'base64').toString('UTF-8').split(":");

    const user = authenticate(username, password)
    if (!user) {
        return res.status(403).end()
    }
    req.user = user; 
    next();
}

function authenticate(username, password) {
    if( username === "kalleKlovn" && password === "rødnese1"){
        return {user:"kalleKlovn", email:"kalle@magiskoy.no", userID:23};
    }
    
    return null;
}

module.exports = authenticator;