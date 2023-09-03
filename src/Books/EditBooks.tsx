import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { urlBooks } from "../endpoints";
import EditEntity from "../utilis/EditEntity";
import BookForm from "./BooksForm"; // Assuming you have a BookForm component
import { bookCreationDTO, booksDTO } from "./Books.models";

export default function EditBooks() {
  const { id }:any = useParams();
  const [book, setBook] = useState<bookCreationDTO>();
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${urlBooks}/${id}`)
      .then((response:AxiosResponse<booksDTO>)=>{
        setBook(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  async function edit(bookToEdit: bookCreationDTO) {
    try {
      await axios.put(`${urlBooks}/${id}`, bookToEdit);
      history.push('/books');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <EditEntity<bookCreationDTO, booksDTO>
        url={urlBooks}
        entityName="Books"
        indexURL="/books"
      >
        {(entity, edit) => (
          <BookForm
            model={entity}
            onSubmit={async (value) => {
              await edit(value);
            }}
          />
        )}
      </EditEntity>
    </>
  );
}
