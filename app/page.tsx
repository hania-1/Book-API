'use client';

import { useEffect, useState } from 'react';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';

type Book = {
  id: number;
  title: string;
  author: string;
  Image: string;
  description: string;
  inCart: boolean; 
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [recentlyAddedBook, setRecentlyAddedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/book');
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  const handleDelete = async (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));

    await fetch('/api/book', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
  };

  const toggleCart = (id: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, inCart: !book.inCart } : book
      )
    );
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#16222A] to-[#3A6073] py-12">
      <div className="container mx-auto px-4">
        {/* Pass setRecentlyAddedBook to BookForm */}
        <BookForm 
          setBooks={setBooks} 
          books={books} 
          setRecentlyAddedBook={setRecentlyAddedBook} 
        />        
        {/* Books I Have Section */}
        <div className="my-8">
          <h2 className="text-2xl font-bold text-zinc-200 mb-4 text-center"><i>suggestion i have </i></h2>
          <BookList books={books} onDelete={handleDelete} toggleCart={toggleCart} />
        </div>
        
        {/* Recently Added Book Section */}
        {recentlyAddedBook && (
          <div className="mt-8 text-center text-white">
            <h2 className="text-xl font-semibold">Recently Added Book</h2>
            <p className="mt-2">{recentlyAddedBook.title} by {recentlyAddedBook.author}</p>
          </div>
        )}
      </div>
    </div>
  );
}
