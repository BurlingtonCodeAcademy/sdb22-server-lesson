module.exports = (req, res, next) => {
    res.header("access-control-allow-origin", "*")
    res.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("access-control-allow-methods", "GET, POST, PUT, DELETE")
    next()
}

/* 
    CORS stands for Cross Origin Resource Sharing

    Allows HTTP headers to handle access to selected resources from different origins. 

    CORS adds new HTTP headers that we specify that lets a server describe what's permitted to read information from the client.

    * access control allows incoming from any origin

    * methods specifies allowed methods in preflight request

    * allow headers is used in response with preflight, indicating which HTTP header can be used during ACTUAL request
*/