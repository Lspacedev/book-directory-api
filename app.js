//const { createFileSystem } = require("./filesystem/createFileSystem");
const express = require("express");
const app = express();

const booksRouter = require("./routes/booksRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/books", booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
