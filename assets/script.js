let myLibrary = [];
const libraryContainer = document.querySelector(".libraryContainer");

let book1 = new Book("Lord of the Rings", "Tolkein", 1000, true);
let book2 = new Book("Falling Free", "Bujold", 500, true);
let book3 = new Book("Wool", "Howey", 500, true);
let book4 = new Book("Sand", "Howey", 500, false);

function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
}

Book.prototype.info = function() {
    const readYet = this.read ? "has been read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pageCount} pages, ${readYet}.`;
}

Book.prototype.readUpdate = function() {
    this.read = !this.read;
}

Book.prototype.readStatus = function() {
    return read ? "Yes" : "No";
}

function createBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pageCount = document.getElementById("pageCount").value;
    const read = Array.from(document.getElementsByName("read")).find(btn => btn.checked).value;
    toggleAddButton(false);
    toggleAddBookForm(true);
    const book = new Book(title, author, pageCount, read);
    addBookToLibrary(book);
}

function toggleAddButton(hide) {
    document.querySelector("#addBook").hidden = hide;
}

function toggleAddBookForm(hide) {
    if (hide) {
        document.querySelector(".addBookForm").style.display = "none";
    } else {
        document.querySelector(".addBookForm").style.display = "flex";
    }
}

function inputNewBook() {
    toggleAddBookForm(false);
    toggleAddButton(true);
    
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    render();
}

function isBookRendered(book) {
    return Array.from(libraryContainer.childNodes).some(node => myLibrary.indexOf(book) == node.getAttribute(["data-index"]));
}

function deleteBook(e) {
    libraryContainer.removeChild(e.target.parentNode);
}

function getDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteBook);
    return deleteButton;
}

function readButtonEvent(e) {
    const bookChange = e.target.getAttribute("id").substr(e.target.getAttribute("id").indexOf(" ") + 1);
}

function readButton(book) {
    const readButtons = document.createElement("form");
    readButtons.setAttribute("action", "Mark read");
    readButtons.textContent = "Read: ";

    for (let i = 0; i < 2; i++) {
        let buttonLabel = i ? "No" : "Yes";
        const readButtonLabel = document.createElement("label");
        const readButtonInput = document.createElement("input");

        readButtonLabel.setAttribute("for", `${buttonLabel.toLowerCase()} ${book.title}`);
        
        readButtonInput.setAttribute("type", "radio");
        readButtonInput.setAttribute("name", "Yes-No");
        
        readButtonInput.setAttribute("id", `${buttonLabel.toLowerCase()} ${book.title}`);

        if (book.read && !i || !book.read && i) {
            readButtonInput.checked = true;
        }

        readButtonLabel.textContent = buttonLabel;

        readButtonInput.addEventListener('change', readButtonEvent); 
        readButtonLabel.appendChild(readButtonInput);
        readButtons.appendChild(readButtonLabel);
    }
    
    return readButtons;

}

function render() {
    for (book of myLibrary) {
        if (!isBookRendered(book)) { 
            const bookUl = document.createElement("ul");
            const bookTitleLi = document.createElement("li");

            bookTitleLi.textContent = book.title;
            bookTitleLi.classList.add("bookTitle");
            bookUl.classList.add("bookUl");
            bookUl.setAttribute(["data-index"], myLibrary.indexOf(book));
            bookUl.appendChild(bookTitleLi);   
            bookUl.appendChild(getDeleteButton());     
            
            for (key in book) {
                if (book.hasOwnProperty(key) && key !== "title" && key !== "serialCount") {
                    const bookLi = document.createElement("li");
                    const keyDisplay = key === "author" ? "Author" : key === "pageCount" ? "Page Count" : "Read";
                    
                    if (key === "author" || key === "pageCount") {
                        bookLi.textContent = `${keyDisplay}: ${book[key]}`;
                    } else {
                        bookLi.appendChild(readButton(book));
                    }

                    bookLi.classList.add("listItem");
                    bookTitleLi.appendChild(bookLi);
                }
            }

            libraryContainer.appendChild(bookUl);
        }
    }
}


addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);