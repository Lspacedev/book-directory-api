const multer = require("multer");
//const multParse = multer();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./book-image-uploads");
  },
  filename: (req, file, cb) => {
    let ISBN = "";

    if (typeof req.params.ISBN !== "undefined") {
      ISBN = req.params.ISBN;
    } else {
      ISBN = req.body.ISBN;
    }

    //const { ISBN } = req.body;

    let extension = "";
    if (JSON.stringify(file) !== "{}") {
      extension = file.originalname.substring(
        file.originalname.indexOf(".") + 1
      );
      cb(null, ISBN + "." + extension);
    }
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = upload;
