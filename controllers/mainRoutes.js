const router = require("express").Router()

router.get("/", (_, res) => {
    res.render("index")
})

router.get("/all", (req, res) => {
    res.status(200).json({
        status: "Getting all items"
    })
})

router.get("/form", (req, res) => {
    const queries = req.query
    console.log(queries)
    res.status(200).json({
        status: "Success",
        queries
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params
    
    res.status(200).json({
        status: `Success`,
        id,
    })
})


router.post("/login", (req, res) => {

    const { username, password } = req.body
    
    res.status(200).json({
        status: "User logged in.",
        username,
        password
    })
})

router.post("/register", (req, res) => {
    
    const { name, surname, email, password } = req.body
    console.log(req.body)
    try {
        if (!name || !surname || !email || !password) {
            res.status(406).json({
                status: "Failed. Insufficient data."
            })
        } else {
            res.status(200).json({
                status: "User registered",
            })
        }
    } catch(error) {
        res.status(500).json({
            status: `${error}`
        })
    }
})

module.exports = router