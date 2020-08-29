let myLibrary = [];
const libraryContainer = document.querySelector(".libraryContainer");

let book1 = new Book("Lord of the Rings", "Tolkein", 1000, true);
let book2 = new Book("Falling Free", "Bujold", 500, true);
let book3 = new Book("Wool", "Howey", 500, true);
let book4 = new Book("Sand", "Howey", 500, true);

function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read ? "Yes" : "Have not read yet";
}

Book.prototype.info = function() {
    const readYet = this.read ? "has been read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pageCount} pages, ${readYet}.`;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function render() {
    for (book of myLibrary) {  
        const bookUl = document.createElement("ul");
        const bookTitleLi = document.createElement("li");
        // bookUl.textContent = book.title;
        // bookUl.classList.add("bookTitle");
        bookTitleLi.textContent = book.title;
        bookTitleLi.classList.add("bookTitle");
        bookUl.classList.add("bookUl");
        bookUl.appendChild(bookTitleLi);        
        
        for (key in book) {
            if (book.hasOwnProperty(key) && key !== "title") {
                const bookLi = document.createElement("li");
                const keyDisplay = key === "author" ? "Author" : key === "pageCount" ? "Page Count" : "Read";
                bookLi.textContent = `${keyDisplay}: ${book[key]}`;
                bookLi.classList.add("listItem");
                bookTitleLi.appendChild(bookLi);
            }
        }
        libraryContainer.appendChild(bookUl);
    }
}


addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
render();