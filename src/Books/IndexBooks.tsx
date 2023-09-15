import React, { useContext } from "react";
import { booksDTO } from "./Books.models";
import IndexEntity from "../utilis/IndexEntity";
import { urlBooks } from "../endpoints";
import AuthenticationContext from "../auth/AuthenticationContext";

export default function IndexBooks() {
  const { claims } = useContext(AuthenticationContext);
  
  const isAdmin = claims?.some(claim => claim.name === 'role' && claim.value === 'admin');
  return (
    
    <>
      <IndexEntity<booksDTO>
          url={urlBooks}
          createURL={isAdmin ? "books/create" : undefined}
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
      <td>{isAdmin ? buttons(`books/edit/${book.id}`, book.id) : null}</td>
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
