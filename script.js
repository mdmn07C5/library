
const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;

        this.info = function () {
            return [this.title, this.author, this.pages, this.read];
        };
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function newDomElmnt(type) {
    return document.createElement(type);
}

function createBookCard(book, index) {
    const bookCard = newDomElmnt('div');
    bookCard.classList.add('card');
    bookCard.setAttribute('data-index', index);

    const bookImage = newDomElmnt('div');
    bookImage.classList.add('image');
    bookCard.appendChild(bookImage);

    const bookInfo = newDomElmnt('div');
    bookInfo.classList.add('info');
    bookInfo.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
    `

    const readButton = newDomElmnt('button');
    readButton.classList.add('read-toggle');
    readButton.innerHTML = book.read ? 'Read' : 'Unread';
    bookInfo.appendChild(readButton);

    bookCard.appendChild(bookInfo);
    
    const removeButton = newDomElmnt('button');
    removeButton.classList.add('remove-btn');
    removeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>trash-can-outline</title>
            <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
        </svg>
    `
    bookCard.appendChild(removeButton);
    
    return bookCard;
}

function renderLibrary() {
    const libraryContainer = document.querySelector('#library');
    libraryContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = createBookCard(book, index);
        libraryContainer.appendChild(bookCard);
    })
}

function addNewBookFromDialog() {
    const titleInput = document.querySelector('#title').value;
    const authorInput = document.querySelector('#author').value;
    let pagesInput = document.querySelector('#pages').value;
    const readInput = document.querySelector('#read').value;

    pagesInput = isNaN(pagesInput) ? 0 : pagesInput;
    addBookToLibrary(titleInput, authorInput, pagesInput, readInput);

    renderLibrary();

    newBookDialog.close();
}

function removeFromLibrary(bookCardElement) {
    const index = bookCardElement.getAttribute('data-index');
    myLibrary.splice(Number.parseInt(index), 1);
    renderLibrary();
}

function toggleRead(element) {
    const index = element.parentElement.parentElement.getAttribute('data-index');
    const book = myLibrary[Number.parseInt(index)];
    book.toggleRead()

    element.classList = 'read-toggle'
    element.classList.add(book.read ? 'read' : 'unread');
    element.innerHTML = `${book.read ? 'Read' : 'Unread'}`;
}

addBookToLibrary('The Black Company', 'Cook, Glenn', 320, true);
addBookToLibrary('Gardens of the Moon', 'Erikson, Steven', 666, true);
addBookToLibrary('Silmarillion', 'Tolkien, J.R.R.', 432, false);

renderLibrary()

const showButton = document.querySelector('#show-dialog');
const newBookDialog = document.querySelector('#newBook');
const addNewBookButton = document.querySelector('#addNewBookBtn');
const libraryContainer = document.querySelector('#library');

showButton.addEventListener('click', () => {
    newBookDialog.showModal();
})

addNewBookButton.addEventListener('click', () => {
    addNewBookFromDialog();
})

libraryContainer.addEventListener('click', function(event) {
    console.log(event.target);
    if (event.target.parentElement.className === 'remove-btn') {
        removeFromLibrary(event.target.parentElement);
    }

    if (event.target.className === 'read-toggle') {
        toggleRead(event.target);
    }
})
