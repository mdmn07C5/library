
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
    bookImage.style.backgroundColor = 'gray';
    bookCard.appendChild(bookImage);

    const bookInfo = newDomElmnt('div');
    bookInfo.classList.add('info');
    bookInfo.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>${book.read ? 'Read' : 'Unread'}</p>
    `
    bookCard.appendChild(bookInfo);

    const removeButton = newDomElmnt('button');
    removeButton.innerHTML = 'Remove';
    removeButton.classList.add('remove-btn');
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



addBookToLibrary('The Black Company', 'Cook, Glenn', 320, true);
addBookToLibrary('Gardens of the Moon', 'Erikson, Steven', 666, true);
addBookToLibrary('Silmarillion', 'Tolkien, J.R.R.', 432, false);

renderLibrary()

const newBookDialog = document.querySelector('#newBook');
const showButton = document.querySelector('#showDialog');
const addNewBookButton = document.querySelector('#addNewBookBtn');
const outputBox = document.querySelector('output');
const removeButtons = document.querySelectorAll('.remove-btn');

showButton.addEventListener('click', () => {
    newBookDialog.showModal();
})

addNewBookButton.addEventListener('click', () => {
    addNewBookFromDialog();
})

removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        removeFromLibrary(button.parentElement);
        console.log('removeButtonClicked');
    })
})
