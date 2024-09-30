const fs = require("fs");

function createFileSystem() {
  const folderPath = "./db";
  fs.access(folderPath, (error) => {
    if (error) {
      fs.mkdir(folderPath, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Db folder created successfully!");
          let createStream = fs.createWriteStream("db/db.json");
          createStream.write("[]");
          createStream.end();
        }
      });
    } else {
      console.log("Folder already exists!");
    }
  });
  const imagesPath = "./book-image-uploads";
  fs.access(imagesPath, (error) => {
    if (error) {
      fs.mkdir(imagesPath, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Images folder created successfully!");
        }
      });
    } else {
      console.log("Folder already exists!");
    }
  });
}

module.exports = { createFileSystem };
