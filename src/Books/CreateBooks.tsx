import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { urlBooks } from '../endpoints';
import BookForm from './BooksForm';
import { bookCreationDTO } from './Books.models';
import DisplayErrors from '../utilis/DisplayErrors';

export default function CreateBooks() {
    const history = useHistory();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(book: bookCreationDTO) {
        try {
            console.log('Creating book:', book);

            await axios.post(urlBooks, book, {
                headers: { 'Content-Type': 'application/json' },
            });

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
                model={{ bookName: '', author: '', publishedDate: new Date(), bookGenre: '' }}
                onSubmit={async (values) => {
                    console.log('Submitting form with values:', values);
                    await create(values);
                }}
            />
        </>
    );
}
