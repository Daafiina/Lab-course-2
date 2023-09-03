import React from "react";
import { booksDTO } from "./Books.models";
import IndexEntity from "../utilis/IndexEntity";
import { urlBooks } from "../endpoints";

export default function IndexBooks() {
  return (
    <>
      <IndexEntity<booksDTO>
        url={urlBooks}
        createURL="books/create"
        title="Books"
        entityName="Book"
      >
        {(books, buttons) => (
          <>
            <thead>
              <tr>
                <th></th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Published Date</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
            {books?.map((book) => (
    <tr key={book.id}> 
      <td>{buttons(`books/edit/${book.id}`, book.id)}</td>
      <td>{book.bookName}</td>
      <td>{book.author}</td>
      <td>{new Date(book.publishedDate).toLocaleDateString()}</td>
      <td>{book.bookGenre}</td>
    </tr>
  ))}
</tbody>

          </>
        )}
      </IndexEntity>
    </>
  );
}
