import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { urlBooks } from '../endpoints';
import BookForm from './BooksForm';
import { bookCreationDTO } from './Books.models'; // Assuming you have a bookCreationDTO model
import DisplayErrors from '../utilis/DisplayErrors';

export default function CreateBooks() {
    const history = useHistory();
    const [errors, setErrors] = useState<string[]>([]);
    console.log("hini")
    async function create(book: bookCreationDTO) {
        try {
            await axios.post(urlBooks, book);
            history.push('/books');
        } catch (error) {
            console.log(error);
            // Handle errors and update the 'errors' state if necessary
        }
    }

    return (
        <>
            <h3>Create Book</h3>
            <DisplayErrors errors={errors} />
            <BookForm
                model={{
                    bookName: '',
                    author: '',
                    publishedDate: new Date(), // Set the default date as needed
                    bookGenre: ''
                }}
                onSubmit={async value => {
                    await create(value);
                }}
            />
        </>
    );
}
