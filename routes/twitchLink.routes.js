const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");

const TwitchLink = require("../models/TwitchLink.model")

// * TWITCH LINK ROUTES * //

// POST "/twitchLink/create"
router.post("/create", isAuthenticated, isAdmin, async(req, res, next) => {
    const {link, picture} = req.body;
    try {
        await TwitchLink.create({
            link: link,
            picture: picture
        });
        // sending info to client
        res.status(200).json("TwitchLink created correctly")
    } catch (error) {
        next(error)
    }
})

module.exports = router;
