const { Router } = require("express");
const booksRouter = Router();
const booksController = require("../controllers/booksController");
const upload = require("../middleware/multerUpload");
// GET /books
// GET /books/:ISBN
// POST /books
// PUT /books/:ISBN
// DELETE /books/:ISBN
booksRouter.get("/", booksController.getAllBooks);
booksRouter.get("/:ISBN", booksController.getBookByISBN);

booksRouter.post("/", upload.single("book_cover"), booksController.createBook);

booksRouter.put(
  "/:ISBN",
  upload.single("book_cover"),
  booksController.updateBook
);

booksRouter.delete("/:ISBN", booksController.deleteBook);
booksRouter.use("*", (req, res) => {
  res.end("Error, route does not exist");
});
module.exports = booksRouter;
