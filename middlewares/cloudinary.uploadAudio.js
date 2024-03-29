const cloudinary = require("cloudinary").v2
const multer = require("multer")


// Send Credentials to Cloudinary.
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
  })

// Config multer

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100 // 100MB max
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/wav' || file.mimetype === 'audio/mp3') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only MP3 and WAV are allowed.'));
    }
  }
}).single('audio');

module.exports = upload;
