let myLibrary = [];
let displayedBooks = [];

function Book(title,author,pages,read,coverUrl = "https://www.pasionfallera.com/images/no-image.jpg") {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.coverUrl = coverUrl,
  this.bookCard = new BookCard(this)
  this.insertionDate = Date.now();
}

function BookCard(book) {
  this.card = document.createElement('div');
  this.card.classList.add('book-card');

  this.coverImg = document.createElement('img');
  this.coverImg.classList.add('cover-img');
  this.coverImg.src = book.coverUrl;

  this.infoDiv = document.createElement('div');
  this.infoDiv.classList.add('info-div');

  this.bookInfo = document.createElement('div');
  this.bookInfo.classList.add('book-info');

  this.bookTitle = document.createElement('h2');
  this.bookTitle.textContent = book.title;

  this.bookAuthor = document.createElement('p');
  this.bookAuthor.textContent = book.author;

  this.bookPages = document.createElement('p');
  this.bookPages.textContent = `${book.pages} pages`;

  this.bookInfo.appendChild(this.bookTitle);
  this.bookInfo.appendChild(this.bookAuthor);
  this.bookInfo.appendChild(this.bookPages);

  this.buttonsDiv = document.createElement('div');
  this.buttonsDiv.classList.add('card-buttons');

  this.editButton = document.createElement('button');
  this.editButton.classList.add('edit-btn');
  this.editButton.addEventListener('click',openEditBookForm.bind(book))

  this.editIcon = document.createElement('i');
  this.editIcon.classList.add('fas','fa-edit');

  this.editButton.appendChild(this.editIcon);

  this.deleteButton = document.createElement('button');
  this.deleteButton.classList.add('delete-btn');
  this.deleteButton.addEventListener('click',deleteBook.bind(book))

  this.deleteIcon = document.createElement('i');
  this.deleteIcon.classList.add('fas', 'fa-trash');

  this.deleteButton.appendChild(this.deleteIcon);

  this.buttonsDiv.appendChild(this.editButton);
  this.buttonsDiv.appendChild(this.deleteButton);

  this.readStatus = document.createElement('div');
  this.readStatus.classList.add('read-status');

  this.readText = document.createElement('p');
  this.readText.classList.add('read-text')
  if (book.read) {
    this.readText.textContent = 'Read';
  } else {
    this.readText.textContent = 'Not Read';
  }


  this.slideContainer = document.createElement('div');
  this.slideContainer.classList.add('slide-container');

  this.input = document.createElement('input')
  this.input.type = 'checkbox';
  if (book.read) {
    this.input.checked = true;
  } else {
    this.input.checked = false;
  }

  this.slide = document.createElement('div');
  this.slide.classList.add('slide');
  this.slide.addEventListener('click', toggleBookRead.bind(book));

  this.slideContainer.appendChild(this.input);
  this.slideContainer.appendChild(this.slide);

  this.readStatus.appendChild(this.readText);
  this.readStatus.appendChild(this.slideContainer);

  this.infoDiv.appendChild(this.bookInfo);
  this.infoDiv.appendChild(this.buttonsDiv);
  this.infoDiv.appendChild(this.readStatus);

  this.card.appendChild(this.coverImg);
  this.card.appendChild(this.infoDiv);

  this.book = book;

}

function addBookToLibrary(title,author,pages,read,coverUrl = "https://www.pasionfallera.com/images/no-image.jpg" ) {
  myLibrary.push(new Book(title,author,pages,read,coverUrl))
}

function updateLibraryInfo() {
  const booksNumber = document.getElementById('books-number');
  booksNumber.textContent = 'Number of Books: ' + myLibrary.length
  const booksRead = document.getElementById('books-read');
  const booksNotRead = document.getElementById('books-not-read');
  const reads = myLibrary.reduce((read,book) => {
    if (book.read) {
      read++;
      return read;
    } else {
      return read;
    }
  },0)
  booksRead.textContent = 'Read: '+reads;
  booksNotRead.textContent = `Not read: ${myLibrary.length - reads}` 
}

function showBooks(array) {
  displayedBooks = []
  array.forEach(book => displayedBooks.push(book))
  array.forEach(book => insertBookCard(book))
}

function insertBookCard(book) {
  const container = document.getElementById("book-list");
  container.appendChild(book.bookCard.card);
}

function deleteBook() {
  myLibrary.splice(myLibrary.indexOf(this),1)
  const bookList = document.getElementById("book-list")
  bookList.removeChild(this.bookCard.card)
  updateLibraryInfo();
}


function openAddBookForm() {
  const form = document.getElementById("add-book-form");
  const opaque = document.getElementById('opaque')
  const formContainer = document.getElementById('add-form-container');
  formContainer.style.display = "flex";
  opaque.style.display = "block"
  form.reset();
  form.style.opacity = 1
  form.style.display = "block"
}

function closeAddBookForm() {
  const form = document.getElementById("add-book-form");
  const opaque = document.getElementById('opaque');
  const formContainer = document.getElementById('add-form-container');
  formContainer.style.display = "none";
  opaque.style.display = "none"
  form.reset();
  form.style.opacity = 0
  form.style.display = "none"
}

function addBookCallback() {
  const title = document.getElementById('add-title').value
  const author = document.getElementById('add-author').value
  const pages = parseInt(document.getElementById('add-pages').value)
  const read = document.getElementById('add-read').checked
  if (read) {
    addBookToLibrary(title,author,pages,true)
  } else {
    addBookToLibrary(title,author,pages,false)
  }
  updateLibraryInfo();
  closeAddBookForm();
  filterLibrary();
  sortLibrary();
  //insertBookCard(myLibrary[myLibrary.length-1]);
}

function openEditBookForm() {
  const form = document.getElementById("edit-book-form");
  form.reset();
  const opaque = document.getElementById('opaque')
  opaque.style.display = "flex"
  let book = this;
  const title = document.getElementById('edit-title');
  title.value = book.title;
  const author = document.getElementById('edit-author');
  author.value = book.author;
  const pages = document.getElementById('edit-pages');
  pages.value = book.pages;
  const read = book.read;
  if (read) {
    document.getElementById('edit-read').checked = true;
    document.getElementById('edit-slide').textContent = 'Read'
  } else {
    document.getElementById('edit-read').checked = false;
    document.getElementById('edit-slide').textContent = 'Not Read'
  }
  const editButton = document.getElementById('editform-btn');
  editButton.dataset.bookIndex = myLibrary.indexOf(this);
  form.style.opacity = 1
  form.style.display = "block"
  const formContainer = document.getElementById('edit-form-container');
  formContainer.style.display = "flex";
}

function closeEditBookForm() {
  const form = document.getElementById("edit-book-form");
  const opaque = document.getElementById('opaque')
  const formContainer = document.getElementById('edit-form-container');
  formContainer.style.display = "none";
  opaque.style.display = "none"
  form.reset();
  form.style.opacity = 0
  form.style.display = "none"
}

function editBookCallback() {
  const editButton = document.getElementById('editform-btn');
  const index = editButton.dataset.bookIndex;
  const book = myLibrary[index];
  const bookCard = book.bookCard;
  
  const title = document.getElementById('edit-title').value;
  bookCard.bookTitle.textContent = title;
  book.title = title;

  const author = document.getElementById('edit-author').value;
  bookCard.bookAuthor.textContent  = author;
  book.author = author;

  const pages = document.getElementById('edit-pages').value;
  bookCard.bookPages.textContent  = pages + " pages";
  book.pages = parseInt(pages);

  if (document.getElementById('edit-read').checked) {
    bookCard.readText.textContent  = 'Read';
    bookCard.input.checked  = true;
    book.read = true;
  } else {
    bookCard.readText.textContent  = 'Not Read';
    bookCard.input.checked  = false;
    book.read = false;
  }
  updateLibraryInfo();
  closeEditBookForm();
  
}

function toggleAddRead() {
  const checkbox = document.getElementById('add-read');
  const slide = document.getElementById('add-slide');
  if (checkbox.checked) {
    slide.textContent = 'Not Read'
    checkbox.checked = false;
  } else {
    slide.textContent = 'Read'
    checkbox.checked = true;
  }
}

function toggleEditRead() {
  const checkbox = document.getElementById('edit-read');
  const slide = document.getElementById('edit-slide')
  if (checkbox.checked) {
    slide.textContent = 'Not Read'
    checkbox.checked = false;
  } else {
    slide.textContent = 'Read'
    checkbox.checked = true;
  }
}

function toggleBookRead() {
  if (this.bookCard.input.checked) {
    this.bookCard.input.checked = false;
    this.read = false;
    this.bookCard.readText.textContent = 'Not Read'
  } else {
    this.bookCard.input.checked = true;
    this.read = true;
    this.bookCard.readText.textContent = 'Read'
  }
  updateLibraryInfo();
}

function toggleFilterMenu() {
  const menu = document.getElementById('filter-menu');
  menu.classList.toggle('show');
}

function filterCallback() {
  filterLibrary();
  showResetFilterButton();
  toggleFilterMenu();
}

function filterLibrary() {
  const filtered = myLibrary.filter(book => {
    const title = new RegExp(document.getElementById('filter-title').value, 'i');
    const author = new RegExp(document.getElementById('filter-author').value, 'i');
    let minPages = document.getElementById('filter-min-pages').value == "" ? undefined : parseInt(document.getElementById('filter-min-pages').value);
    let maxPages = document.getElementById('filter-max-pages').value == "" ? undefined : parseInt(document.getElementById('filter-max-pages').value);
    const read = document.getElementById('filter-read').checked;
    const notRead = document.getElementById('filter-not-read').checked;
    let ignoreReadState = undefined;
    let bookRead = undefined;

    if (minPages == undefined && maxPages == undefined) {
      minPages = 0;
      maxPages = Infinity;
    } else if (minPages == undefined) {
      minPages = 0;
    } else if (maxPages == undefined) {
      maxPages = Infinity;
    }

    if ( (read && notRead) || (!read && !notRead) ) {
      ignoreReadState = true;
    } else if (read) {
      ignoreReadState = false;
      bookRead = true;
    } else {
      ignoreReadState = false;
      bookRead = false;
    }

    if (ignoreReadState) {
      return title.test(book.title) && author.test(book.author) && book.pages >= minPages && book.pages <= maxPages;
    } else {
      return title.test(book.title) && author.test(book.author) && book.pages >= minPages && book.pages <= maxPages && book.read == bookRead;
    }
  });
  wipeBooksList()
  showBooks(filtered);
}

function wipeBooksList() {
  myLibrary.forEach (book => {
    const bookList = document.getElementById('book-list');
    if (bookList.contains(book.bookCard.card)) {
      bookList.removeChild(book.bookCard.card);
    }
  })
}

function clearFilterForm() {
  const form = document.getElementById('filter-menu');
  form.reset();
}

function showResetFilterButton() {
  const button = document.getElementById('reset-filter-btn');
  button.style.display = 'block'
}

function resetFilter() {
  const button = document.getElementById('reset-filter-btn');
  button.style.display = 'none'
  showBooks(myLibrary);
  sortLibrary();
}

function sortLibrary() {
  const sortBy = document.getElementById('sort-by').value;
  const sortOrder = document.getElementById('sort-order').value;
  
  if (sortOrder == 'asc') {
    switch (sortBy) {
      case 'title':
        displayedBooks.sort(function(a,b){
          if (a.title < b.title) {
            return -1
          } else if (a.title > b.title) {
            return 1
          } else {
            return 0
          }
        })
        break;
        case 'author':
        displayedBooks.sort(function(a,b){
          if (a.author < b.author) {
            return -1
          } else if (a.author > b.author) {
            return 1
          } else {
            return 0
          }
        })
        break;
        case 'pages':
        displayedBooks.sort(function(a,b){return a.pages-b.pages})
        break;
        case 'insertion-date':
        displayedBooks.sort(function(a,b){return a.insertionDate-b.insertionDate})
        break;
      default:
        break;
    }
  } else if (sortOrder == 'desc') {
    switch (sortBy) {
      case 'title':
        displayedBooks.sort(function(a,b){
          if (a.title < b.title) {
            return 1
          } else if (a.title > b.title) {
            return -1
          } else {
            return 0
          }
        })
        break;
        case 'author':
        displayedBooks.sort(function(a,b){
          if (a.author < b.author) {
            return 1
          } else if (a.author > b.author) {
            return -1
          } else {
            return 0
          }
        })
        break;
        case 'pages':
        displayedBooks.sort(function(a,b){return b.pages-a.pages})
        break;
        case 'insertion-date':
        displayedBooks.sort(function(a,b){return b.insertionDate-a.insertionDate})
        break;
      default:
        break;
    }
  } 

  showBooks(displayedBooks);
}


const addBookBtn = document.getElementById("add-book-btn");
addBookBtn.addEventListener('click',openAddBookForm);

const addSlide = document.getElementById('add-slide');
addSlide.addEventListener('click', toggleAddRead);

const editSlide = document.getElementById('edit-slide');
editSlide.addEventListener('click', toggleEditRead);

const filterButton = document.getElementById('filter-btn');
filterButton.addEventListener('click', toggleFilterMenu);

const sortBy = document.getElementById('sort-by');
const sortOrder = document.getElementById('sort-order');
sortBy.addEventListener('change', sortLibrary);
sortOrder.addEventListener('change', sortLibrary);

const resetFilterButton = document.getElementById('reset-filter-btn');
resetFilterButton.addEventListener('click',resetFilter);

const clearFilterButton = document.getElementById('clear-filter');
clearFilterButton.addEventListener('click', clearFilterForm)

addBookToLibrary("Narnia","CS Lewis",256,true,"https://images-na.ssl-images-amazon.com/images/I/51WbmTRk-4L._SX331_BO1,204,203,200_.jpg")
addBookToLibrary("Harry Potter","JK Rowling",543,false,"https://prodimage.images-bn.com/pimages/9780590353427_p0_v2_s550x406.jpg")
addBookToLibrary("Harry Potasdater","JK Rowling",543,true)

showBooks(myLibrary);
updateLibraryInfo();