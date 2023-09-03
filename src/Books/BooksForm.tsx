import Button from "../utilis/Button";
import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import { bookCreationDTO } from "./Books.models";
import DateField from "../forms/DateField"; // Assuming DateField is a valid component

export default function BookForm(props: BookFormProps) {
    return (
        <>
            <Formik
                initialValues={props.model}
                onSubmit={props.onSubmit}
                validationSchema={Yup.object({
                    BookName: Yup.string().required('Book Name is required').max(50, 'Max length is 50 characters'),
                    Author: Yup.string().required('Author is required').max(50, 'Max length is 50 characters'),
                    BookGenre: Yup.string().required('Genre is required').max(50, 'Max length is 50 characters'),
                })}
            >
                {(formikProps) => (
                    <Form>
                        <TextField field="bookName" displayName="Book Name" />
                        <TextField field="author" displayName="Author" />
                        {/* <DateField displayName="Published Date" field="publishedDate" /> Match field name */}

                        <TextField field="bookGenre" displayName="Genre" />
                        <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                        <Link className="btn btn-secondary" to="/books">Cancel</Link>
                    </Form>
                )}
            </Formik>
        </>
    );
}

interface BookFormProps {
    model: bookCreationDTO;
    onSubmit(values: bookCreationDTO, action: FormikHelpers<bookCreationDTO>): void;
}
