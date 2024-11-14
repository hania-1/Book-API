'use client';

import { useState } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
  Image: string;
  description: string;
  inCart: boolean;
};

interface BookFormProps {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  books: Book[];
  setRecentlyAddedBook: React.Dispatch<React.SetStateAction<Book | null>>;
}

const BookForm = ({ setBooks, books, }: BookFormProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [suggestions, setSuggestions] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setTitle(query);

    if (query) {
      const matchedBooks = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(matchedBooks);
    } else {
      setSuggestions([]); // Show suggestions again when cleared
    }
  };

  const handleSuggestionClick = (book: Book) => {
    setSelectedBook(book);  // Mark book as selected
    setSuggestions([]); // Clear suggestions
    setTitle(book.title);
    // setRecentlyAddedBook(book); // Set the recently added book
    scrollToSelectedBook(book.id);
  };

  const scrollToSelectedBook = (bookId: number) => {
    const bookElement = document.getElementById(`book-${bookId}`);
    if (bookElement) {
      bookElement.scrollIntoView({ behavior: 'smooth' });
      // Change book color to indicate selection
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, selected: true } : book
        )
      );
    }
  };

  // Clear search input and reset suggestions
  const handleClearSearch = () => {
    setTitle('');
    setSuggestions([]);
    setSelectedBook(null);
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-gray-600 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-100">Search or Add a Book</h2>

      {/* Search bar */}
      <div className="mb-4 relative">
        <input
          type="text"
          value={title}
          onChange={handleInputChange}
          placeholder="Search Book Title"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        {/* Clear button */}
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

      {/* If a book is selected, show a 'Search' button instead */}
      {selectedBook && (
        <button
          type="button"
          onClick={() => scrollToSelectedBook(selectedBook.id)}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg"
        >
          View Book
        </button>
      )}

      {/* Other fields (author input) */}
      {!selectedBook && (
        <div className="mb-4">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Book Author"
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
      )}
    </form>
  );
};

export default BookForm;
