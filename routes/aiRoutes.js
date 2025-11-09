const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

// Placeholder face processing endpoint
router.post('/faceshift', upload.single('image'), async (req, res) => {
  if(!req.file) return res.status(400).json({error:'no file'});
  // For now just return file path and fake emotion
  const emotion = 'neutral';
  const out = { detected_emotion: emotion, output_image: '/uploads/' + req.file.filename };
  res.json(out);
});

module.exports = router;
