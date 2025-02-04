# Employee App | Backend - Part One

A simple API that allows users to add, update and delete books.

## Prerequisites

- Nodejs
- Express

## Installation

1. Clone the repository

```bash
git@github.com:Lspacedev/book-directory-api.git
```

2. Navigate to the project folder

```bash
cd book-directory-api

```

3.  Install all dependencies

```bash
npm install
```

4. Run the following createFileSystem.js file to create the neccessary folders:

```bash
 node ./filesystem/createFileSystem.js
```

5. Run the project

```bash
node app
```

## Usage

1. The server should run on PORT 3000, unless a port is specified.
2. Use http://localhost:3000, to test the API on Postman or any other tool.

## Routes:

API is built using a Node Express server, using a db.json file as a database.

#### Books Router:

- Get all books.
- Get book by ISBN.
- Add book.
- Update book.
- Delete book.

Endpoints

```python
    1. POST /books
        Inputs: ISBN, book_title, author, publisher, published_date, book_cover (image)

    2. PUT /books/:ISBN
            Params: ISBN
            Inputs: ISBN, book_title, author, publisher, published_date, book_cover (image)

    3. DELETE /books/:ISBN
      Params: ISBN

    5. GET /books
    6. GET /books/:ISBN
        Params: ISBN
```

## Tech Stack

- NodeJs
- Express
- Multer
