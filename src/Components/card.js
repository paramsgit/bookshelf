import React, { useEffect, useState } from "react";

const Card = (props) => {
  const { imageId, name, author, bookshelf, uid, showDltBtn, refresh, setrefresh } = props;
  const [showAddBtn, setshowAddBtn] = useState(true)

  useEffect(() => {
    checkInShelf()
  }, [])

  function isInBookShelf(targetString) {
    const books = localStorage.getItem('bookshelf');

    if (books) {
      const bookSet = new Set(JSON.parse(books).map(book => JSON.stringify(book)));
      return [...bookSet].some(book => {
        const parsedBook = JSON.parse(book);
        return parsedBook.uid === targetString || parsedBook.name === targetString || parsedBook.author === targetString || parsedBook.imgLink === targetString;
      });
    }

    return false;
  }



  function checkInShelf() {
    if (isInBookShelf(uid)) { setshowAddBtn(false) }
    else setshowAddBtn(true)
  }

  const addToShelf = (uid, name, author, imgLink) => {
    const books = localStorage.getItem('bookshelf');
    let bookSet;

    if (books) {
      bookSet = new Set(JSON.parse(books).map(book => JSON.stringify(book)));
    } else {
      bookSet = new Set();
    }

    const newBook = { uid, name, author, imgLink };

    bookSet.add(JSON.stringify(newBook));

    localStorage.setItem('bookshelf', JSON.stringify([...bookSet].map(book => JSON.parse(book))));
    setshowAddBtn(false)
  };

  const handleAddtoShelf = () => {
    addToShelf(uid, name, author, imageId)
  }

  const removeFromShelf = () => {
    const books = localStorage.getItem('bookshelf');

    if (books) {
      let bookSet = new Set(JSON.parse(books).map(book => JSON.stringify(book)));
      bookSet.forEach(book => {
        const parsedBook = JSON.parse(book);
        if (parsedBook.uid === uid) {
          bookSet.delete(book);
        }
      });

      localStorage.setItem('bookshelf', JSON.stringify([...bookSet].map(book => JSON.parse(book))));
    } else {
      console.log('No books in the shelf.');
    }
    setrefresh(!refresh)
  };

  return (
    <div className="mx-2">
      <div className="CardDiv relative isolate flex flex-col justify-end overflow-hidden rounded-xl px-4 pb-8 pt-[13rem] w-[13rem] mx-auto mt-24 min-h-[20rem]">
        <img src={`https://covers.openlibrary.org/b/id/${imageId}-M.jpg`} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <div className={`shelfDiv absolute top-2 ml-[1.7rem] opacity-0 ${!showAddBtn && "hidden"}`}>
          <button onClick={() => handleAddtoShelf()} type="button" className=" rounded-full  px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-green-700 hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-700 shadow-xl">
            Add to Bookshelf
          </button>
        </div>
        <div className={` absolute top-2 right-2  ${!showDltBtn && "hidden"}`}>
          <button onClick={() => removeFromShelf()} type="button" className=" rounded-full  px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-red-700 hover:bg-red-800 dark:bg-red-700 dark:hover:bg-red-700 shadow-xl">
            Delete
          </button>
        </div>
        <div className="z-10 absolute">
          <h3 className="z-10 mt-3 text-xl font-bold text-white">{name}</h3>
          <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{author}</div>
        </div>
      </div>
    </div>

  );
};

export default Card;
