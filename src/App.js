import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks.js'
import ListBooks from './ListBooks.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelvedBooks: [],
    foundBooks: [],
    query: '',
  }

  updateShelf(bookToUpdate, shelf) {
    BooksAPI.update(bookToUpdate, shelf).then(() => {
      this.setState({
        shelvedBooks: this.state.shelvedBooks
                      .filter(book => book.id !== bookToUpdate.id)
                      .concat(Object.assign({}, bookToUpdate, {shelf: shelf})),
        foundBooks: this.state.foundBooks
                    .map(book => book.id === bookToUpdate.id
                                ? Object.assign({}, book, { shelf: shelf })
                                : book
                    )
      })
    });
  }

  searchForBooks() {
    if (this.state.query === '') {
      this.setState({ foundBooks: [] });
      return;
    }

    const putOnShelf = book =>
      Object.assign(
        {},
        book,
        this.state.shelvedBooks.find(shelvedBook => shelvedBook.id === book.id)
      )

    BooksAPI.search(this.state.query).then(response =>
      this.setState({
        foundBooks: response.error ? [] : response.map(putOnShelf)
      })
    )
  }

  updateQuery(query) {
    this.setState(
      { query },
      () => { this.searchForBooks() }
    )
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ shelvedBooks: books }));
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            shelvedBooks={this.state.shelvedBooks}
            foundBooks={this.state.foundBooks}
            query={this.state.query}
            updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
            updateQuery={(query) => this.updateQuery(query)}
          />
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.shelvedBooks}
            updateShelf={(book, shelf) => this.updateShelf(book, shelf)}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
