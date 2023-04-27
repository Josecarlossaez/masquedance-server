const cloudinary = require('./cloudinary.config');
const upload = require('./cloudinary.uploadAudio');

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
