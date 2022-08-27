const express = require('express')
const router = express.Router()
const team = require('../models/team')

router.get('/get-team/:id', (req, res, next) => {
    team.find({game: req.params.id }).sort({_id:-1}).limit(1).then(team => {
        if (team?.length > 0) {
            return res.status(200).json({ message: "Data Found", team });
        } else {
            res.status(422).json({ message: "Data Not Found" })
        }
    })
})

router.post('/add-team', (req, res) => {
    const { teamOne, teamTwo, userId, gameId} = req.body
    if (!teamOne, !teamTwo) {
        return res.status(400).send({ message: "Please fill all the fields" });
    } else {

    }
    const teamDetails = new team({
        teamOne: teamOne,
        teamTwo: teamTwo,
        user: userId,
        game: gameId
        
    })
    teamDetails.save().then(data => {
        return res.status(200).json({ message: "Teams Added Successfully" })
    }).catch(err => {
        return res.status(400).json({ message: "Something went wrong!" });
    })
})

router.post("/delete-team/:id", async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).send({ message: "Please fill all the fields" });
    } else {
        const TeamDelete = await team.findByIdAndDelete({ _id: id })
        if (TeamDelete) {
            return res.status(200).json({ message: "Team Deleted Successfully" })
        }
        else {
            return res.status(401).json({ message: "Unable to Delete." })
        }
    }
});

module.exports = router