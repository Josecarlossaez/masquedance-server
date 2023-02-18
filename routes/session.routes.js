const router = require("express").Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/cloudinary.middleware")

const Session = require("../models/Session.model")

// ** SESSION ROUTES **

// POST "/session/create" => create Session
router.post("/create", isAdmin, uploader.single("picture"), async(req, res, next) => {
    const { dj, picture, link} = req.body;
    try {
        await Session.create({
            dj: dj,
            picture: picture,
            link: link,
        });
        // sending info to client
        res.status(200).json("Session created correctly")
    } catch (error) {
        next(error)
    }
});

// GET "/session/list" => list all sessions
 router.get("/list", async(req, res, next) => {
    try {
    const responseList = await Session.find()
        // sending info to client
        res.status(200).json(responseList)
    } catch (error) {
        next(error)
    }    
 })

// PATCH "/session/:sessionId/update" => update Session
router.patch("/:sessionId/update", isAdmin, uploader.single("picture"), async(req, res, next) => {
    const{sessionId} = req.params
    const { dj, picture, link} = req.body;
    try {
        await Session.findByIdAndUpdate(sessionId, {
            dj: dj,
            picture: picture,
            link: link,
        });
        // sending info to client
        res.status(200).json("Session updated correctly")
    } catch (error) {
        next(error)
    }
});

// DELETE "/session/:sessionId/delete" => delete Session
router.delete("/:sessionId/delete", isAdmin, async(req, res, next) => {
    const{sessionId} = req.params
    try {
        await Session.findByIdAndDelete(sessionId);
        // sending info to client
        res.status(200).json("Session deleted correctly")
    } catch (error) {
        next(error)
    }
})

// GET "/session/:sessionId/details" => details of session
router.get("/:sessionId", async(req, res, next) => {
    const{sessionId} = req.params;
    try {
       const responseDetails = await Session.findById(sessionId);
       // sending info to client
       res.status(200).json(responseDetails)
    } catch (error) {
        next(error)
    }

})

module.exports = router;