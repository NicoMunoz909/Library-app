let myLibrary = [];

function Book(title,author,pages,read,coverUrl = "https://www.pasionfallera.com/images/no-image.jpg") {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.coverUrl = coverUrl,
  this.bookCard = createBookCard(this)
}

function BookCard(book) {
  this.card = document.createElement('div');
  this.card.classList.add('book-card');

  this.coverImg = document.createElement('img');
  this.coverImg.classList.add('cover-img');

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

  this.deleteButton = document.createElement('button');
  this.deleteButton.classList.add('delete-btn');

  this.buttonsDiv.appendChild(this.editButton);
  this.buttonsDiv.appendChild(this.deleteButton);

  this.slideContainer = document.createElement('div');
  this.slideContainer.classList.add('slide-container');

  this.input = document.createElement('input')
  this.input.type = 'checkbox';

  this.slide = document.createElement('div');
  this.slide.classList.add('slide');
  this.slide.addEventListener('click', toggleBookRead.bind(book));

  this.slideContainer.appendChild(this.input);
  this.slideContainer.appendChild(this.slide);

  this.infoDiv.appendChild(this.bookInfo);
  this.infoDiv.appendChild(this.buttonsDiv);
  this.infoDiv.appendChild(this.slideContainer);

  this.card.appendChild(this.coverImg);
  this.card.appendChild(this.infoDiv);

  return this.card;
}

function createBookCard(book) {
  const element = document.createElement('div');
  element.classList.add('book-card');

  const infoDiv = document.createElement('div');
  infoDiv.id = 'book-info';

  const imgDiv = document.createElement('div');
  imgDiv.id = 'img-container';
  const cover = document.createElement('img');
  cover.src = book.coverUrl;
  imgDiv.appendChild(cover);
  element.appendChild(imgDiv)

  const title = document.createElement('h2');
  title.textContent = book.title;
  title.id = 'title';
  infoDiv.appendChild(title);

  const author = document.createElement('p');
  author.textContent = book.author;
  author.id = 'author';
  infoDiv.appendChild(author);

  const pages = document.createElement('p');
  pages.textContent = book.pages+" pages";
  pages.id = 'pages';
  infoDiv.appendChild(pages);

  const label = document.createElement('label');
  label.for = 'read';
  label.classList.add('switchBtn');
  const input = document.createElement('input');
  input.type = 'checkbox';
  const div = document.createElement('div');
  div.classList.add('slide');
  div.classList.add('round');
  input.addEventListener('click', toggleBookRead.bind(book));
  if (book.read) {
    input.checked = true;
    div.textContent = "Read"
  } else {
    input.checked = false;
    div.textContent = "Not Read"
  }
  label.appendChild(input);
  label.appendChild(div);
  infoDiv.appendChild(label);

  

  const buttonsDiv = document.createElement('div');

  const delete_btn = document.createElement("button");
  delete_btn.addEventListener("click",deleteBook.bind(book));
  delete_btn.id = 'delete-btn';
  const delete_icon = document.createElement('i');
  delete_icon.classList.add('fas');
  delete_icon.classList.add('fa-trash');
  delete_btn.appendChild(delete_icon);
  buttonsDiv.appendChild(delete_btn);

  const edit_btn = document.createElement("button");
  edit_btn.addEventListener("click",openEditBookForm.bind(book));
  edit_btn.id = 'edit-btn';
  const edit_icon = document.createElement('i');
  edit_icon.classList.add('fas');
  edit_icon.classList.add('fa-edit');
  edit_btn.appendChild(edit_icon);
  buttonsDiv.appendChild(edit_btn);

  buttonsDiv.classList.add('card-buttons')
  infoDiv.appendChild(buttonsDiv);
  element.appendChild(infoDiv);
  return element
}

function addBookToLibrary(title,author,pages,read,coverUrl = "https://www.pasionfallera.com/images/no-image.jpg" ) {
  myLibrary.push(new Book(title,author,pages,read,coverUrl))
}

function updateLibraryInfo() {
  const booksNumber = document.getElementById('books-number');
  booksNumber.textContent = 'Number of Books: ' + myLibrary.length
  const booksRead = document.getElementById('books-read');
  const reads = myLibrary.reduce((read,book) => {
    if (book.read) {
      read++;
      return read;
    } else {
      return read;
    }
  },0)
  booksRead.textContent = 'Books read: '+reads;
}

function showBooks() {
  myLibrary.forEach(book => insertBookCard(book))
}

function insertBookCard(book) {
  const container = document.getElementById("book-list");
  container.appendChild(book.bookCard);
}

function deleteBook() {
  myLibrary.splice(myLibrary.indexOf(this),1)
  const bookList = document.getElementById("book-list")
  bookList.removeChild(this.bookCard)
  updateLibraryInfo();
}


function openAddBookForm() {
  const form = document.getElementById("add-book-form");
  const opaque = document.getElementById('opaque')
  opaque.style.display = "block"
  form.reset();
  form.style.opacity = 1
  form.style.display = "block"
}

function closeAddBookForm() {
  const form = document.getElementById("add-book-form");
  const opaque = document.getElementById('opaque')
  opaque.style.display = "none"
  form.reset();
  form.style.opacity = 0
  form.style.display = "none"
}

function addBookCallback() {
  const title = document.getElementById('add-title').value
  const author = document.getElementById('add-author').value
  const pages = document.getElementById('add-pages').value
  const read = document.getElementById('add-read').checked
  if (read) {
    addBookToLibrary(title,author,pages,true)
  } else {
    addBookToLibrary(title,author,pages,false)
  }
  updateLibraryInfo();
  closeAddBookForm();
  insertBookCard(myLibrary[myLibrary.length-1]);
}

function openEditBookForm() {
  const form = document.getElementById("edit-book-form");
  form.reset();
  const opaque = document.getElementById('opaque')
  opaque.style.display = "block"
  let book = this;
  const id = document.getElementById('identification');
  id.textContent = book.title;
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
  
}

function closeEditBookForm() {
  const form = document.getElementById("edit-book-form");
  const opaque = document.getElementById('opaque')
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
  bookCard.children[1].children[0].textContent = title;
  book.title = title;

  const author = document.getElementById('edit-author').value;
  bookCard.children[1].children[1].textContent  = author;
  book.author = author;

  const pages = document.getElementById('edit-pages').value;
  bookCard.children[1].children[2].textContent  = pages + " pages";
  book.pages = parseInt(pages);

  if (document.getElementById('edit-read').checked) {
    bookCard.children[1].children[3].children[1].textContent  = 'Read';
    bookCard.children[1].children[3].children[0].checked  = true;
    book.read = true;
  } else {
    bookCard.children[1].children[3].children[1].textContent  = 'Not Read';
    bookCard.children[1].children[3].children[0].checked  = false;
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
  if (this.read) {
    this.bookCard.children[1].children[3].children[1].textContent  = 'Not Read';
    this.bookCard.children[1].children[3].children[0].checked  = false;
    this.read = false;
  } else {
    this.bookCard.children[1].children[3].children[1].textContent  = 'Read';
    this.bookCard.children[1].children[3].children[0].checked  = true;
    this.read = true;
  }
  updateLibraryInfo();
}

const addBookBtn = document.getElementById("add-book-btn")
addBookBtn.addEventListener('click',openAddBookForm)

const addSlide = document.getElementById('add-slide')
addSlide.addEventListener('click', toggleAddRead)

const editSlide = document.getElementById('edit-slide')
editSlide.addEventListener('click', toggleEditRead)

addBookToLibrary("Narnia","CS Lewis",256,true,"https://images-na.ssl-images-amazon.com/images/I/51WbmTRk-4L._SX331_BO1,204,203,200_.jpg")
addBookToLibrary("Harry Potter","JK Rowling",543,false,"https://prodimage.images-bn.com/pimages/9780590353427_p0_v2_s550x406.jpg")
addBookToLibrary("Harry Potasdater","JK Rowling",543,true)

showBooks();
updateLibraryInfo();