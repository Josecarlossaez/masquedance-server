const router = require("express").Router();

// This route exists only for receive an image, bring to cloudinary and send the URL to the front.E
const uploader = require("../middlewares/cloudinary.middleware");
const uploadAudio = require("../middlewares/audio.middleware")

router.post("/", uploader.single("picture"), (req, res, next) => {
  if (req.file === undefined) {
    res.status(400).json("problemas subiendo la imagen");
    return;
  }
  console.log(req.file.path); //CLOUDINARY URL
  res.status(200).json({ picture: req.file.path });
});

// upload audio to cloudinary
router.post("/uploadAudio", uploadAudio, (req, res, next) => {
  res.status(200).json({ audio: req.file.url })
})

module.exports = router;
