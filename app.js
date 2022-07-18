require("dotenv").config()

const Express = require("express")
const app = Express()
const cors = require("cors")

const mainRoutes = require("./controllers/mainRoutes")

const PORT = process.env.PORT || 4000

/* 
    Express handles server process and route management (thru controllers)
    
    To use:
        * Import express
        * set app variable to top level Express function invokation
        * setup your app.listen method to listen on a port.
            * takes port as first param
            * takes anonymous no param callback to run.
        * use app.http-method to handle each route
            * takes string of route as first param
            * takes handler callback that contains logic
                * handler has request and response parameters
                * req and res parameters have access to express methods!!!

*/

app.use(Express.static(__dirname + "/static"))

const logTime = (req, res, next) => {
    let date = new Date()
    console.log(date.toLocaleDateString())
    next()
}


// Express.json() parses our json request object.
app.use(cors())
app.use(Express.json())
app.use(Express.urlencoded())
app.use(logTime)
app.use(mainRoutes)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})