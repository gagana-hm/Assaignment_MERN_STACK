const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, files, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(files.originalname); // Get file extension
    cb(null, uniqueSuffix + ext); // Assign unique filename
  },
});

const fileFilter = function (req, files, cb) {
  const filetypes = /jpeg|jpg|png/; // Allowed file types
  const mimetype = filetypes.test(files.mimetype); // Check mimetype
  const extname = filetypes.test(
    path.extname(files.originalname).toLowerCase()
  ); // Check file extension
  if (mimetype && extname) {
    return cb(null, true); // Accept the file
  } else {
    cb("Error: Only .jpg, .jpeg, .png files are allowed!"); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
