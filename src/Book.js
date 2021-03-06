import React from 'react';

const Book = ({book, updateShelf}) => {
  const bookCoverStyle = {
    width: 128,
    height: 193,
    backgroundImage: `url(${
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : ''
      })`
  };

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={bookCoverStyle}></div>
        <div className="book-shelf-changer">
          <select
            onChange={event => updateShelf(book, event.target.value)}
            value={book.shelf ? book.shelf : 'none'}
          >
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors
        ? <div className="book-authors">{book.authors.join(', ')}</div>
        : ''
      }
    </div>
  )
};

export default Book;