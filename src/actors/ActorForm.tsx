import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../forms/TextField";
import Button from "../utilis/Button";
import { Link } from "react-router-dom";
import { actorCreationDTO } from "./actors.model";
import * as Yup from 'yup';
export default function FilterMovies(props:actorFormProps){
    return(
        <Formik 
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            name:Yup.string().required('This field is required').firstLetterUppercase()
            
        })}>
            {(formikProps)=>(
                <Form>
                    <TextField displayName="Name" field="name"/>
                    <Button disabled={formikProps.isSubmitting} type="submit">Save changes</Button>
                    <Link to="/actors" className="btn btn-secondary">Cancel</Link>
                </Form>
            )}

            
        </Formik>
    )
}

interface actorFormProps{
    model:actorCreationDTO;
    onSubmit(values:actorCreationDTO,action:FormikHelpers<actorCreationDTO>):void;
}