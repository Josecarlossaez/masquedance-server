const router = require("express").Router();

const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const uploader = require("../middlewares/cloudinary.middleware")

const Dj = require("../models/Dj.model");

// ** DJ ROUTES **

// POST "/dj/create" => create dj
router.post("/create",isAuthenticated, isAdmin, uploader.single("picture"), async(req, res, next) => {
    const {name, picture, description} = req.body;
    try {
        await Dj.create({
            name:name,
            picture: picture,
            description: description,
        });
        // sending info to client
        res.status(200).json("Dj created correctly")
    } catch (error) {
        next(error);
    }
});

// GET "/dj/list" => list all dj's
router.get("/list", async(req,res,next) => {
    try {
    const responseList = await Dj.find();
    // sending info to client
    res.status(200).json(responseList)
    } catch (error) {
        next(error)
    }
});

// PATCH "/dj/:djId/update" => update dj
router.patch("/:djId/update", isAuthenticated, isAdmin, async(req, res, next) => {
    const { djId } = req.params
    const {name, picture, description} = req.body;

    try {
        await Dj.findByIdAndUpdate(djId, {
            name:name,
            picture: picture,
            description: description,
        });
        // sending info to client
        res.status(200).json("Dj updated correctly")
    } catch (error) {
        next(error)
    }
});

// DELETE "/dj/:djId/delete" => delete dj
router.delete("/:djId/delete",isAuthenticated, isAdmin, async(req,res,next) => {
    const { djId } = req.params
    try {
        await Dj.findByIdAndDelete(djId);
        //sending info to client
        res.status(200).json("Dj deleted correctly")
    } catch (error) {
        next(error)
    }
});

// GET "/dj/:djId/details" => details of each Dj
router.get("/:djId/details", async(req, res, next) => {
    const { djId } = req.params
    try {
        const responseDetails = await Dj.findById( djId )
        // sending info to client
        res.status(200).json(responseDetails)
    } catch (error) {
        next(error)
    }
})



module.exports = router;
