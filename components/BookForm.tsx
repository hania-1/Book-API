'use client';

import { useState } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
  Image: string;
  description: string;
  inCart: boolean;
  isFavorite?: boolean;
};

interface BookFormProps {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  books: Book[];
  setRecentlyAddedBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

const BookForm = ({ setBooks, books }: BookFormProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setTitle(query);

    if (query) {
      const matchedBooks = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(matchedBooks);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (book: Book) => {
    setSelectedBook(book);
    setSuggestions([]);
    setTitle(book.title);
    scrollToSelectedBook(book.id);
  };

  const scrollToSelectedBook = (bookId: number) => {
    const bookElement = document.getElementById(`book-${bookId}`);
    if (bookElement) {
      bookElement.scrollIntoView({ behavior: 'smooth' });
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, selected: true } : book
        )
      );
    }
  };

  const handleClearSearch = () => {
    setTitle('');
    setSuggestions([]);
    setSelectedBook(null);
  };

  const addFavoriteBook = () => {
    const newBook: Book = {
      id: Date.now(),
      title,
      author,
      Image: '',
      description: '',
      inCart: false,
      isFavorite: true,
    };
    setFavoriteBooks([...favoriteBooks, newBook]);
    setTitle('');
    setAuthor('');
  };

  const deleteFavoriteBook = (id: number) => {
    setFavoriteBooks(favoriteBooks.filter(book => book.id !== id));
  };

  const updateFavoriteBook = (id: number) => {
    const updatedBooks = favoriteBooks.map(book =>
      book.id === id ? { ...book, title, author } : book
    );
    setFavoriteBooks(updatedBooks);
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-gray-600 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-100">Search or Add a Book</h2>

      <div className="mb-4 relative">
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Search Book Title"
          className="w-full p-3 border border-gray-100 rounded-lg bg-zinc-200"
        />
        {title && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            Clear
          </button>
        )}

        {suggestions.length > 0 && !selectedBook && (
          <div className="mt-2 bg-gray-100 p-2 rounded-md max-h-48 overflow-y-auto">
            {suggestions.map((book) => (
              <div
                key={book.id}
                className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                onClick={() => handleSuggestionClick(book)}
              >
                {book.title} - {book.author}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBook && (
        <button
          type="button"
          onClick={() => scrollToSelectedBook(selectedBook.id)}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg"
        >
          View Book
        </button>
      )}

      {!selectedBook && (
        <div className="mb-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Book Author"
            className="w-full p-3 border border-gray-300 rounded-lg bg-zinc-200"
          />
        </div>
      )}

      <div className="my-4">
        <h3 className="text-lg font-semibold text-gray-100">Add Favorite Book</h3>
        <button
          type="button"
          onClick={addFavoriteBook}
          disabled={!title} // Button is disabled if title is empty
          className={`w-full py-3 font-semibold rounded-lg mt-2 ${
            title ? 'bg-green-500 text-white' : 'bg-gray-400 text-gray-300 cursor-not-allowed'
          }`}
        >
          Add to Favorites
        </button>
      </div>

      {favoriteBooks.length > 0 && (
        <div className="my-4">
          <h3 className="text-lg font-semibold text-gray-100">Favorite Books</h3>
          {favoriteBooks.map((book) => (
            <div
              key={book.id}
              className="p-4 border border-gray-300 rounded-lg mb-2 flex justify-between items-center text-gray-100"
            >
              <div>
                <p>{book.title}</p>
                <p className="text-gray-500">{book.author}</p>
              </div>
              <div>
                <button
                  onClick={() => updateFavoriteBook(book.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => deleteFavoriteBook(book.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default BookForm;
