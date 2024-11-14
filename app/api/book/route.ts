import { NextResponse } from 'next/server';
let books: { id: number; title: string; author: string; Image: string; description: string }[] = [
  { id: 1, title: 'Moby Dick', author: 'Herman Melville', Image: '/pic-1.png', description: 'A novel about the voyage of the whaling ship Pequod.' },
  { id: 2, title: '1984', author: 'George Orwell', Image: '/pic-2.png', description: 'A dystopian novel about a totalitarian regime.' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', Image: '/pic-3.png', description: 'A guide to building good habits and breaking bad ones.' },
  { id: 4, title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', Image: '/pic-4.png', description: 'A book that challenges conventional wisdom about happiness.' },
  { id: 5, title: 'To Kill a Mockingbird', author: 'Harper Lee', Image: '/pic-5.png', description: 'A novel about racial injustice in the Deep South.' },
  { id: 6, title: 'Becoming', author: 'Michelle Obama', Image: '/pic-6.png', description: 'The memoir of the former First Lady of the United States.' },
  { id: 7, title: 'The Book Thief', author: 'Markus Zusak', Image: '/pic-7.png', description: 'A story of a young girl in Nazi Germany during WWII.' },
  { id: 8, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', Image: '/pic-8.png', description: 'The first book in the Harry Potter series.' },
  { id: 9, title: 'Educated', author: 'Tara Westover', Image: '/pic-9.png', description: 'A memoir about growing up in a survivalist family.' },
  { id: 10, title: 'Pride and Prejudice', author: 'Jane Austen', Image: '/pic-10.png', description: 'A classic novel about love and social expectations.' },
  { id: 11, title: 'Macbeth', author: 'William Shakespeare', Image: '/pic-11.png', description: 'A tragedy about the rise and fall of Macbeth.' },
  { id: 12, title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', Image: '/pic-12.png', description: 'A deep dive into the history of humankind from the Stone Age to the present.' },
  { id: 13, title: 'The Alchemist', author: 'Paulo Coelho', Image: '/pic-13.png', description: 'A philosophical story about pursuing your dreams and finding your personal legend.' },
  { id: 14, title: 'The Catcher in the Rye', author: 'J.D. Salinger', Image: '/pic-14.png', description: 'A story about teenage rebellion and the loss of innocence.' },
  { id: 15, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', Image: '/pic-15.png', description: 'A novel about the American Dream in the Jazz Age.' },
];


export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const book = await request.json();
  books.push(book);
  return NextResponse.json(book, { status: 201 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  books = books.filter((book) => book.id !== id);
  return NextResponse.json({ message: 'Book deleted' });
}
