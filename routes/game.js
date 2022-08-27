const express = require('express');
const game = require('../models/game');
const router = express.Router()

// game 
router.post("/add-game", (req, res) => {
    const { gameName, address, city, country, contactName, position, phoneNumber, email, userId } = req.body
    if (!gameName, !address, !city, !country, !contactName, !position, !phoneNumber, !email) {
        return res.status(400).send({ message: "Please fill all the fields" });
    } else {
        const gameDetails = new game({
            gameName: gameName,
            address: address,
            city: city,
            country: country,
            contactName: contactName,
            position: position,
            phoneNumber: phoneNumber,
            email: email,
            user: userId
        })
        gameDetails.save().then(saveGame => {
            return res.status(200).json({ message: "Game Created Successfully" })
        }).catch(err => {
            return res.status(400).json({ message: "Something went wrong!" });
        })
    }
});

router.get("/game/:id", (req, res) => {
    const id = req.params.id

    game.find({ _id: id }).sort("-createdAt").then(game => {
        if (game?.length > 0) {
            return res.status(200).json({ message: "Data Found", game });
        } else {
            return res.status(400).json({ message: "Data Not Found" });
        }
    }).catch(err => {
        return res.status(400).json({ message: "Something went wrong!" });
    })
});

router.get("/user-game/:id", (req, res) => {
    const id = req.params.id

    game.find({ user: id }).sort("-createdAt").then(game => {
        if (game?.length > 0) {
            return res.status(200).json({ message: "Data Found", game });
        } else {
            return res.status(400).json({ message: "Data Not Found" });
        }
    }).catch(err => {
        return res.status(400).json({ message: "Something went wrong!" });
    })
});

router.get("/get-game", (req, res) => {
    game.find({}).sort("-createdAt").then(game => {
        if (game?.length > 0) {
            return res.status(200).json({ message: "Data Found", game });
        } else {
            return res.status(400).json({ message: "Data Not Found" });
        }
    }).catch(err => {
        return res.status(400).json({ message: "Something went wrong!" });
    })
});

router.post("/update-game/:id", async (req, res) => {
    const id = req.params.id
    const { name, address, city, country, contactName, position, phone, email } = req.body

    if (name, address, city, country, contactName, position, phone, email, !id) {
        return res.status(400).send({ message: "Please fill all the fields" });
    } else {
        const updateGame = await game.findById({ _id: id })
        if (updateGame) {
            updateGame.gameName = name,
                updateGame.address = address,
                updateGame.city = city,
                updateGame.country = country,
                updateGame.contactName = contactName,
                updateGame.position = position,
                updateGame.phoneNumber = phone,
                updateGame.email = email,

                updateGame.save().then(data => {
                    return res.status(200).json({ message: "Changes Updated" })
                }).catch(err => {
                    return res.status(422).json({ message: "Something went wrong!" })
                })
        }
        else {
            return res.status(401).json({ message: "Unable to update." })
        }
    }
});

router.post("/delete-game/:id", async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).send({ message: "Please fill all the fields" });
    } else {
        const updateProject = await game.findByIdAndDelete({ _id: id })
        if (updateProject) {
            return res.status(200).json({ message: "Game Deleted Successfully" })
        }
        else {
            return res.status(401).json({ message: "Unable to Delete." })
        }
    }
});


module.exports = router