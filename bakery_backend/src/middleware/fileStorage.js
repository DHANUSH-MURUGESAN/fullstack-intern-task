// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         console.log("file", file)
//         cb(null, "../uploads")
//     },
//     filename: function(req, file, cb){
//         const extension = path.extname(file.originalname)
//         const fileName = `${Date.now()}-${file.originalname}`
//         cb(null, fileName)
//     }
// })

// const uploads = multer({storage:storage})

// module.exports = uploads

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../uploads");

// ensure uploads folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file", file);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const uploads = multer({ storage });

module.exports = uploads;
