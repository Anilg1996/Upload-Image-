const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

// Configure multer to specify where to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // This will store files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename files to prevent overwriting
  },
});

const upload = multer({ storage });

// Serve static files from the "uploads" directory
app.use('/uploads', express.static('uploads'));

// Define a route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  // The uploaded file information is available in req.file
  res.json({ message: 'File uploaded successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
