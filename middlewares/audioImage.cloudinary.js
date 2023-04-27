const cloudinary = require("cloudinary").v2
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

// Send Credentials to Cloudinary.
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

function uploadAudioMiddleware(req, res, next) {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      allowedFormats: ["mp3", "wav"],
      folder: "audio"
    }
  })
  const uploader = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 10 // 10MB max
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav' || file.mimetype === 'audio/mp3') {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only MP3 and WAV are allowed.'));
      }
    }
  }).single('audio');

  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err)
      return res.status(400).json({message: 'Error uploading file'});
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err)
      return res.status(400).json({message: 'Error uploading file'});
    }

    next();
  });
}

module.exports = uploadAudioMiddleware;
