// const cloudinary = require('./cloudinary.config');
const cloudinary = require('cloudinary').v2;

const upload = require('./cloudinary.uploadAudio');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const uploadAudio = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'No file selected.'
      });
    }

    const path = req.file.path;

    cloudinary.uploader.upload(path, {
      resource_type: 'auto',
      folder: 'audio'
    }, (err, result) => {
      if (err) {
        return res.status(400).json({
          message: err.message
        });
      }

      req.file.url = result.url;
      next();
    });
  });
};

module.exports = uploadAudio;
