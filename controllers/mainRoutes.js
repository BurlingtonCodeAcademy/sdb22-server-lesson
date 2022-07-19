const router = require("express").Router()
// 8. Import mongoose to your mainRouter
const mongoose = require("mongoose")

// 9. Import your schema to where your endpoints are
const UsersSchema = require("../models/Users")

// 10. Create a collection utilizing the Users schema.
const Users = mongoose.model("users", UsersSchema)

router.get("/", (_, res) => {
    res.render("index")
})

router.get("/allUsers", async (req, res) => {

    let allUsers = await Users.find({})
    console.log(allUsers)
    res.status(200).json({
        status: "Getting all users",
        allUsers
    })
})

router.get("/:reqEmail", async (req, res) => {
    const { reqEmail } = req.params
    let findUserByEmail = await Users.find({ email: reqEmail })
    if (findUserByEmail.length == 0) {
        res.status(500).json({
            status: `User ${reqEmail} not found.`
        })
    } else {
        res.status(200).json({
            status: `User ${reqEmail} found:`,
            findUserByEmail
        })
    }
    
})

// Challenge
// Create a PUT route that updates an existing user
// Create a DELETE route that deletes user based on their id.

router.put("/:id", async (req, res) => {

    const { id } = req.params
    const { name, surname, email, password } = req.body

    let updateUserByEmail = await Users.updateOne(
        { _id: id },
        { name, surname, email, password}
    )

    res.status(200).json({
        status: "User updated",
        updateUserByEmail
    })
})

router.delete("/delete/:userId", async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        res.status(406).json({
            status: "Please enter valid User Id",
        })
    } else {
        let deletedUser = await Users.findOneAndDelete({ _id: userId })
        if (!deletedUser) {
            res.status(500).json({
                status: `Could not find user with this ID` 
            })
        } else {
            res.status(410).json({
                status: `User deleted`,
                deletedUser
            })
        }
    }
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

// Create functionality to insert new entry into a collection
//  11. Make your callback fx async
router.post("/register", async (req, res) => {
    
    const { name, surname, email, password } = req.body
    console.log(req.body)
    try {
        if (!name || !surname || !email || !password) {
            res.status(406).json({
                status: "Failed. Insufficient data."
            })
        } else {

            // 12. Create new instance of model schema and pass an object that binds each req.body property to the schema properties. Wrap it into a variable.
            const newUser = new Users({
                name: name,
                surname: surname,
                email: email,
                password: password
            })
            //  13. Save your entry to your collection.
            await newUser.save()

            res.status(201).json({
                status: "User registered",
                newUser
            })
        }
    } catch(error) {
        res.status(500).json({
            status: `${error}`
        })
    }
})

module.exports = router