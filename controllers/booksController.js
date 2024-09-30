const fs = require("fs");

function getAllBooks(req, res) {
  fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
    if (err) {
      console.error(err);
      res.end();
    }
    res.setHeader("Content-Type", "application/json");
    res.send(jsonString);
  });
}
function getBookByISBN(req, res) {
  const { ISBN } = req.params;
  fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
    if (err) {
      console.error(err);
      res.end();
    }

    const books = JSON.parse(jsonString);
    const [book] = books.filter((book) => book.ISBN === ISBN);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(book));
  });
}
function createBook(req, res) {
  const { ISBN, book_title, author, publisher, published_date } = req.body;
  if (
    ISBN === "" ||
    typeof ISBN === "undefined" ||
    book_title === "" ||
    typeof book_title === "undefined" ||
    author === "" ||
    typeof author === "undefined" ||
    publisher === "" ||
    typeof publisher === "undefined" ||
    published_date === "" ||
    typeof published_date === "undefined" ||
    JSON.stringify(req.file) === "{}" ||
    typeof JSON.stringify(req.file) === "undefined"
  ) {
    return res.send("Fields cannot be empty");
  }

  fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
    if (err) {
      console.error(err);
      res.end();
    }

    let books = JSON.parse(jsonString);
    let filteredBook = books.filter((book) => book.ISBN === ISBN);

    if (filteredBook.length > 0) {
      return res.send("Error, Book already exists");
    }

    let obj = {
      ISBN,
      book_title,
      author,
      publisher,
      published_date,
    };

    //get file extension

    const extension = req.file.originalname.substring(
      req.file.originalname.indexOf(".") + 1
    );
    obj.book_cover = `${ISBN}.${extension}`;
    books.push(obj);
    let updatedBooks = JSON.stringify(books);

    fs.writeFile("./db/db.json", updatedBooks, (err) => {
      if (err) {
        console.error("Error writing file", err);
        res.end();
      } else {
        res.send("Successfully added book");
      }
    });
  });
}

function updateBook(req, res) {
  const { ISBN, book_title, author, publisher, published_date } = req.body;
  if (JSON.stringify(req.body) === "{}" && typeof req.file === "undefined") {
    return res.send("Must have atleast one field to update");
  }
  fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
    if (err) {
      console.error(err);
      res.end();
    }

    let books = JSON.parse(jsonString);
    let book = books.find((book) => book.ISBN === req.params.ISBN);
    if (ISBN) {
      book.ISBN = ISBN;
    }
    if (book_title) {
      book.book_title = book_title;
    }
    if (author) {
      book.author = author;
    }
    if (publisher) {
      book.publisher = publisher;
    }
    if (published_date) {
      book.published_date = published_date;
    }
    let updatedBooks = JSON.stringify(books);

    fs.writeFile("./db/db.json", updatedBooks, (err) => {
      if (err) {
        console.error("Error writing file", err);
        res.end();
      } else {
        res.send("Successfully updated book");
      }
    });
  });
}

function deleteBook(req, res) {
  const { ISBN } = req.params;

  fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
    if (err) {
      console.error(err);
      res.end();
    }

    let books = JSON.parse(jsonString);
    let [deletedBook] = books.filter((book) => book.ISBN === ISBN);
    if (
      JSON.stringify(deletedBook) === "{}" ||
      typeof deletedBook === "undefined"
    ) {
      return res.send("Book does not exist");
    }

    let filteredBooks = books.filter((book) => book.ISBN !== ISBN);
    let updatedBooks = JSON.stringify(filteredBooks);

    fs.writeFile("./db/db.json", updatedBooks, (err) => {
      if (err) {
        console.error("Error writing file", err);
        res.end();
      } else {
        if (typeof deletedBook.book_cover !== "undefined") {
          fs.unlink(`./book-image-uploads/${deletedBook.book_cover}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        }
        res.send("Successfully deleted book");
      }
    });
  });
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  createBook,
  updateBook,
  deleteBook,
};
