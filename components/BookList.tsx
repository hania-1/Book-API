// import { Image } from "lucide-react";
import Image from "next/image";

interface Book {
  id: number;
  title: string;
  author: string;
  Image: string;
  description: string;
  inCart: boolean; // Track cart status
  selected?: boolean; // Optional selected state
}

interface BookListProps {
  books: Book[];
  onDelete: (id: number) => void;
  toggleCart: (id: number) => void; // Function to add/remove from cart
}

const BookList: React.FC<BookListProps> = ({ books, onDelete, toggleCart }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          id={`book-${book.id}`} // Add an ID here for smooth scroll targeting
          key={book.id}
          className={`bg-zinc-400 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all ease-in-out transform hover:scale-105 ${book.selected ? 'border-4 border-blue-500' : ''}`}
        >
          {/* import Image from 'next/image'; */}

<div className="bg-gray-100 h-48 w-full rounded-lg overflow-hidden mb-4">
  <Image
    src={book.Image || "/path/to/default/Image.png"}
    alt={book.title}
    className="w-full h-full object-cover object-center"
    width={500} // You can specify the width if required
    height={500} // Similarly, specify the height if required
  />
</div>


          <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
          <p className="text-gray-600">{book.author}</p>
          <p className="text-gray-500 text-sm">{book.description}</p>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => toggleCart(book.id)}
              className={`py-2 px-4 text-white font-semibold rounded-lg transition-all ${
                book.inCart ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {book.inCart ? 'Added to Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={() => onDelete(book.id)}
              className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;