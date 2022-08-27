const express = require('express');
const user = require('../models/user');
const router = express.Router()

// app user login
router.post("/user-register", async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).send({ message: "Please fill all the fields" });
    } else {

        const findUser = await user.findOne({ email: email.toLowerCase() })
        if (findUser) {
            return res.status(400).json({ message: "User already registered with this email, please log in" })
        } else {
            const userDetails = await new user({
                name: name,
                email: email.toLowerCase(),
                password: password
            })
            userDetails.save().then(saveUser => {
                return res.status(200).json({ message: "User Register Successfully" })
            }).catch(err => {
                return res.status(400).json({ message: "Something went wrong!" });
            })
        }
    }
});

router.post("/user-login", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send({ message: "Please fill all the fields" });
    } else {
        user.findOne({ email: email.toLowerCase(), password: password }).select("name email").then(user => {
            if (user) {
                return res.status(200).json({ message: "Login Successfully", user })
            } else {
                return res.status(400).send({ message: "Invalid email or password!" });
            }
        }).catch(err => {
            return res.status(400).send({ message: "Something went wrong" });
        })

    }
});

router.post("/delete-user/:id", async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).send({ message: "Please fill all the fields" });
    } else {
        const updateProject = await user.findByIdAndDelete({ _id: id })
        if (updateProject) {
            return res.status(200).json({ message: "User Deleted Successfully" })
        }
        else {
            return res.status(401).json({ message: "Unable to Delete." })
        }
    }
});

module.exports = router