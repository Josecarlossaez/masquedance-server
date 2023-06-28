const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");

const TwitchLink = require("../models/TwitchLink.model")

// * TWITCH LINK ROUTES * //

// POST "/twitchLink/create" => create twitch link
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

// GET "twitchLink/list" => view twitch link
router.get("/list", async(req, res, next) => {
    try {
        const responseList = await TwitchLink.find()
            //sending info to client
            res.status(200).json(responseList)
        } catch (error) {
            next(error)
        }
})

module.exports = router;
