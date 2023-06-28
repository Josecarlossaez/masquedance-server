const router = require("express").Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/cloudinary.middleware")

const Video = require("../models/Video.model")

// ** VIDEO ROUTES **

// POST "/video/ create" => create video
router.post("/create", isAdmin, async(req, res, next) => {
    const {link, title, picture, dj} = req.body
    try {
        await Video.create({
            link: link,
            title: title,
            picture: picture,
            dj: dj
        })
        // sending info to client
        res.status(200).json("Video created correctly")
    } catch (error) {
        next(error)
    }
});

// PATCH "/video/:videoId/update" => update Video
router.patch("/:videoId/update", isAdmin, async(req, res, next) => {
    const { videoId } = req.params
    try {
        await Video.findByIdAndUpdate(videoId, {
            link: link,
        })
        // sending info to client
        res.status(200).json("Video updated correctly")
    } catch (error) {
        next(error)
    }
});

// GET "/video/list" => list all videos
router.patch("/list", async(req, res, next) => {
    try {
        const responseList = await Video.find()
        // sending info to client
        res.status(200).json(responseList)
    } catch (error) {
        next(error)
    }
});

// DELETE "/video/:videoId/delte" => delete video
router.delete("/:videoId/delete", isAdmin, async(req, res, next) => {
    const { videoId } = req.params
    try {
        await Video.findByIdAndDelete( videoId )
    } catch (error) {
        next(error)
    }
})



module.exports = router;