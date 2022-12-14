const userInputTitle = document.getElementById("titleInput");
const userInputAuthor = document.getElementById("authorInput");
const userInputPages = document.getElementById("pagesInput");
const userInputRead = document.getElementById("readInput");
const userInputNotRead = document.getElementById("notReadInput");
const submitFormButton = document.getElementById("submitForm");
const submitAndClose = document.querySelector(".submitAndClose");
const booksInLibrary = document.querySelector(".booksInLibrary");
const bookTitleTable = document.querySelector(".bookTitleTable");
const bookAuthorTable = document.querySelector(".bookAuthorTable");
const bookPagesTable = document.querySelector(".bookPagesTable");
const bookReadTable = document.querySelector(".bookReadTable");
// const title = document.querySelector(".title");
// const author = document.querySelector(".author");
// const pages = document.querySelector(".pages");
// const read = document.querySelector(".read");
// const notRead = document.querySelector(".notReadInput");
// const card = document.querySelector(".card");

// const userInputTitleValidity = () => {
//   if (userInputTitle.validity.tooShort) {
//     userInputTitle.setCustomValidity("Book title must be at least 3 character");
//     userInputTitle.reportValidity();
//   } else {
//     userInputTitle.setCustomValidity("");
//   }
// };

// const userInputAuthorValidity = () => {
//   if (userInputAuthor.validity.tooShort) {
//     userInputAuthor.setCustomValidity("Author's name must be at least 2 character");
//     userInputAuthor.reportValidity();
//   } else {
//     userInputAuthor.setCustomValidity("");
//   }
// };

// const userInputPagesValidity = () => {
//   if (userInputPages.validity.rangeUnderflow) {
//     userInputPages.setCustomValidity("Page number must be above 3");
//     userInputPages.reportValidity();
//   } else {
//     userInputPages.setCustomValidity("");
//   }
// };

// userInputTitle.addEventListener("input", (event) => {
//   userInputTitleValidity();
// });
// userInputAuthor.addEventListener("input", (event) => {
//   userInputAuthorValidity();
// });
// userInputPages.addEventListener("input", (event) => {
//   userInputPagesValidity();
// });

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// MODAL STUFF
let addNewBook = document.querySelector(".addNewBook");
let modalbg = document.querySelector(".modal-bg");
let modalClose = document.querySelector(".modalClose");

addNewBook.addEventListener("click", (e) => {
  modalbg.classList.add("bg-active");
});
modalClose.addEventListener("click", (e) => {
  modalbg.classList.remove("bg-active");
});

let libOpen = false;
const addToLibrary = (title, author, pages, read, newCardElement) => {
  if (myLibrary.some((e) => e.title === title)) {
    alert("This title already exists in the library. Now stop testing the limits of my program.");
    return;
  }
  myLibrary.push(new Book(title, author, pages, read));
  if (libOpen == true) {
    document.body.appendChild(newCardElement);
    cardWrapper.append(newCardElement);
    setTimeout(clearInput(), 175);
  } else return;
};

// let meinKampf = addToLibrary("hitler", "1337", "mein kampf", true);

// if (mein) { }

// addToLibrary("Patrik2", "AuthorIngebrigtsen", "bro", "Read");
// addToLibrary("Patrik", "AuthorIngebrigtsen", "bro", "Not read");
// addToLibrary("Patri6", "AuthorIngebrigtsen", "bro", "Read");

const fileBook = () => {
  if (libOpen == true) {
    if (readOrNotRead() === true) {
      const ceRet = createElements();
      const aceRet = addClassElements(ceRet[0], ceRet[1], ceRet[2], ceRet[3], ceRet[4]);
      const aieRet = appendInnerElements(aceRet[0], aceRet[1], aceRet[2], aceRet[3], aceRet[4]);
      const lieRet = labelInnerElements(aceRet[1], aceRet[2], aceRet[3], aceRet[4]);
      const diRet = deleteIcon(aieRet[0]);
      const trRet = toggleRead(aceRet[0]);
      updateReadStatus(trRet[0], aceRet[4], trRet[1]);
      colorReadStatus(aieRet[0], aceRet[4]);
      deleteOnClick(aieRet, diRet);
      addToLibrary(lieRet[0], lieRet[1], lieRet[2], lieRet[3], aieRet[0]);
    }
  } else {
    if (readOrNotRead() === true) {
      addToLibrary(userInputTitle.value, userInputAuthor.value, userInputPages.value, userInputRead.value);
      setTimeout(clearInput(), 175);
    }
  }
};

const checkInputs = () => {
  if (userInputTitle.value === "" || userInputTitle.validity.tooShort) {
    userInputTitle.setCustomValidity("Book title must be at least 3 character");
    userInputTitle.reportValidity();
    return;
  }
  if (userInputAuthor.value === "" || userInputAuthor.validity.tooShort) {
    userInputAuthor.setCustomValidity("Author's name must be at least 2 character");
    userInputAuthor.reportValidity();
    return;
  }
  if (userInputPages.value === "" || userInputPages.validity.rangeUnderflow) {
    userInputPages.setCustomValidity("Page number must be above 3");
    userInputPages.reportValidity();
    return;
  }
  if (userInputRead.checked !== true && userInputNotRead.checked !== true) {
    userInputRead.setCustomValidity("Choose Yes or No");
    userInputRead.reportValidity();
    return;
  }
  fileBook();
};

submitFormButton.addEventListener("click", (e) => {
  checkInputs();
});

submitAndClose.addEventListener("click", (e) => {
  checkInputs();
  modalbg.classList.remove("bg-active");
});

booksInLibrary.addEventListener("click", (e) => {
  if (libOpen == false) {
    if (myLibrary.length === 0) {
      return alert("No books in library");
    }
    for (i = 1; i <= myLibrary.length; i++) {
      const ceRet = createElements();
      const aceRet = addClassElements(ceRet[0], ceRet[1], ceRet[2], ceRet[3], ceRet[4], ceRet[5]);
      const aieRet = appendInnerElements(aceRet[0], aceRet[1], aceRet[2], aceRet[3], aceRet[4], ceRet[5]);
      const diRet = deleteIcon(aieRet[0]);
      appendOuterElements(aieRet[0]);
      deleteOnClick(aieRet, diRet);
      assignBookValues(aceRet[1], aceRet[2], aceRet[3], aceRet[4]);
      const trRet = toggleRead(aceRet[0]);
      updateReadStatus(trRet[0], aceRet[4], trRet[1]);
      colorReadStatus(aieRet[0], aceRet[4]);
      booksInLibrary.textContent = "Mentally Collapse Library";
      libOpen = true;
    }
  } else {
    for (i = 0; i < myLibrary.length; i++) {
      const removeCardElement = document.querySelector(".card-border");
      removeCardElement.parentElement.removeChild(removeCardElement);
      booksInLibrary.textContent = "View Books in Library";
    }
    libOpen = false;
  }
  // identifyCards();
});

const deleteOnClick = (aieRet, diRet) => {
  aieRet[0].dataset.id = i - 1;
  diRet[1].addEventListener("click", () => {
    if (myLibrary.length === 1) {
      myLibrary.splice(0, 2);
      aieRet[0].remove(aieRet[0]);
      booksInLibrary.textContent = "View Books in Library";
      libOpen = false;
      return;
    }
    idCard = aieRet[0].dataset.id;
    myLibrary.splice(idCard, 1);
    aieRet[0].remove(aieRet[0]);
  });
};

const deleteIcon = (newCardElement) => {
  const deleteCard = document.createElement("img");
  deleteCard.classList.add("deleteCard");
  newCardElement.appendChild(deleteCard);
  deleteCard.src = "img/delete-icon.png";
  return [newCardElement, deleteCard];
};

// Book.prototype.toggleReadProto = function () {
// console.log(Book);
// console.log(myLibrary[this]);
// console.log("prototype logged!");
// }

const toggleRead = (newCardElement) => {
  const toggleRead = document.createElement("button");
  toggleRead.classList.add("toggleRead");
  newCardElement.appendChild(toggleRead);
  return [toggleRead, newCardElement];
};

const colorReadStatus = (newCardElement, readElement) => {
  if (readElement.textContent === "Read") {
    newCardElement.classList.add("read");
  }
  if (readElement.textContent === "Not read") {
    newCardElement.classList.add("not-read");
  }
};

const updateReadStatus = (toggleRead, readElement, newCardElement) => {
  toggleRead.addEventListener("click", (e) => {
    if (readElement.textContent === "Read") {
      readElement.textContent = "Not read";
      newCardElement.classList.add("not-read");
      newCardElement.classList.remove("read");
      toggleRead.classList.add("not-read-toggle");
      toggleRead.classList.remove("read-toggle");
      return;
    }
    if (readElement.textContent === "Not read") {
      readElement.textContent = "Read";
      newCardElement.classList.add("read");
      newCardElement.classList.remove("not-read");
      toggleRead.classList.add("read-toggle");
      toggleRead.classList.remove("not-read-toggle");
    }
  });
};

// const validateUserInput = () => {
//   if (userInputTitle.value.length === 0 && userInputAuthor.value.length === 0 && userInputPages.value.length === 0) {
//     return alert("Ghost book! Try again.");
//   }
//   if (userInputTitle.value.length === 0) {
//     alert("The book must have a title you fucking idiot");
//     return false;
//   }
//   if (userInputAuthor.value.length === 0) {
//     alert("No one wrote the book? It just came out of nowhere? YOU MORON");
//     return false;
//   }
//   if (userInputPages.value.length === 0) {
//     alert(
//       "Counting is hard, but books do have page numbers and if your special little book doesn't at least just fucking guess."
//     );
//     return false;
//   }
//   if (userInputPages.value < 1) {
//     alert("Page count must be higher than 0");
//     return false;
//   }
//   if (userInputPages.value > 5000) {
//     alert("Page count can not be higher than 5000");
//     return false;
//   }
//   return true;
// };

const readOrNotRead = () => {
  if (userInputRead.checked === true) {
    userInputRead.value = "Read";
    return true;
  }
  if (userInputNotRead.checked === true) {
    userInputRead.value = "Not read";
    return true;
  }
  return false;
};

const cardWrapper = document.createElement("div");
cardWrapper.setAttribute("class", "cardWrapper");
document.body.append(cardWrapper);

const createElements = () => {
  const newCardElement = document.createElement("div");
  const titleElement = document.createElement("div");
  const authorElement = document.createElement("div");
  const pagesElement = document.createElement("div");
  const readElement = document.createElement("div");
  return [newCardElement, titleElement, authorElement, pagesElement, readElement];
};

const addClassElements = (newCardElement, titleElement, authorElement, pagesElement, readElement) => {
  newCardElement.classList.add("card-border");
  newCardElement.classList.add("card-active");
  newCardElement.classList.add("bookCard");
  titleElement.classList.add("bookElement");
  authorElement.classList.add("bookElement");
  pagesElement.classList.add("bookElement");
  readElement.classList.add("bookElement");
  return [newCardElement, titleElement, authorElement, pagesElement, readElement];
};

const appendInnerElements = (newCardElement, titleElement, authorElement, pagesElement, readElement) => {
  newCardElement.appendChild(titleElement);
  newCardElement.appendChild(authorElement);
  newCardElement.appendChild(pagesElement);
  newCardElement.appendChild(readElement);
  return [newCardElement, titleElement, authorElement, pagesElement, readElement];
};

const appendOuterElements = (newCardElement) => {
  document.body.appendChild(newCardElement);
  cardWrapper.append(newCardElement);
};

const labelInnerElements = (titleElement, authorElement, pagesElement, readElement) => {
  titleElement.textContent = "Title: " + userInputTitle.value;
  authorElement.textContent = "Author: " + userInputAuthor.value;
  pagesElement.textContent = "Pages: " + userInputPages.value;
  readElement.textContent = userInputRead.value;
  return [userInputTitle.value, userInputAuthor.value, userInputPages.value, userInputRead.value];
};

const assignBookValues = (titleElement, authorElement, pagesElement, readElement) => {
  if (myLibrary[i - 1].title.length === 0) {
    myLibrary[i - 1].title = "Not specified";
  } else {
    titleElement.textContent = "Title: " + myLibrary[i - 1].title;
  }

  if (myLibrary[i - 1].author.length === 0) {
    myLibrary[i - 1].author = "Not specified";
  } else {
    authorElement.textContent = "Author: " + myLibrary[i - 1].author;
  }

  if (myLibrary[i - 1].pages.length === 0) {
    myLibrary[i - 1].pages = "Not specified";
  } else {
    pagesElement.textContent = "Pages: " + myLibrary[i - 1].pages;
  }

  readElement.textContent = myLibrary[i - 1].read;
};

const clearInput = () => {
  userInputTitle.value = "";
  userInputAuthor.value = "";
  userInputPages.value = "";
  userInputRead.checked = false;
  userInputNotRead.checked = false;
};
