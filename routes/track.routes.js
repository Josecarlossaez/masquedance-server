const router = require("express").Router();
const uploadAudio = require("../middlewares/audio.middleware")







const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");


const Track = require("../models/Track.model")


// ** TRACK ROUTES **  

//POST "/track/create" => create Track
router.post("/create", async(req, res, next) => {
    const { title, dj, audio, picture } = req.body
    try {
       const response =  await Track.create({
          
           title: title,
           picture: picture,
           audio: audio,
           dj: dj,
        })
        console.log("req", req)
        

        
        // sending info to client
        res.status(200).json(response)
      
    } catch (error) {
        next(error)
    }
});

// GET "/track/list" => view all tracks
router.get("/list", async (req, res, next) => {
    try {
       const response = await Track.find()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})



  



















// PATCH "/track/:trackId/update" => update track
// router.patch("/:trackId/update",isAuthenticated, isAdmin, uploader.single("picture"), async(req, res, next) => {
//     const { trackId } = req.params
//     const { title, picture, dj, link } = req.body
//     try {
//         await Track.findByIdAndUpdate(trackId, {
//             title: title,
//             picture: picture,
//             dj: dj,
//             link: link,
//         });
//         // sending info to client
//         res.status(200).json("Track updated correctly")
//     } catch (error) {
//         next(error)
//     }

// });

// // GET "/track/list" => list all tracks
// router.get("/list", async(req, res, next) => {
//     try {
//         const responseList = await Track.find()
//         // sending info to client
//         res.status(200).json(responseList)
//     } catch (error) {
//         next(error)
//     }
// });

// // DELETE "/track/:trackId/delete" => delete track
// router.delete("/:trackId/delete", isAuthenticated, isAdmin, async(req, res, next) => {
//     const { trackId } = req.params
//     try {
//         await Track.findByIdAndDelete( trackId )
//         // sending info to client
//         res.status(200).json("Track deleted correctly")
//     } catch (error) {
//         next(error)
//     }
// })


module.exports = router;