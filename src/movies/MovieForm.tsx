import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model";
import * as Yup from 'yup';
import Button from "../utilis/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "../forms/CheckboxField";
import MultipleSelector, { multipleSelectorModel } from "../forms/MultipleSelector";
import { genreDTO } from "../genres/genres.model";
import { useState } from "react";
import { movieTheaterDTO } from "../movietheaters/movieTheater.model";
//import TypeAheadActors from "../forms/TypeAheadActors";
import MarkdownField from "../forms/MarkDownField";

export default function MovieForm(props: movieFormProps){

    const[selectedGenres, setSelectedGenres]= useState(mapToModel(props.selectedGenres));
    const[nonselectedGenres, setNonSelectedGenres]= 
        useState(mapToModel(props.nonSelectedGenres));

        const[selectedMovieTheaters, setSelectedMovieTheaters]= useState(mapToModel(props.selectedGenres));
        useState(mapToModel(props.selectedMovieTheaters));
    const[nonSelectedMovieTheaters, setNonSelectedMovieTheaters]=
        useState(mapToModel(props.nonSelectedMovieTheaters));

        

    function mapToModel(items: {id: number, name: string} []): multipleSelectorModel[]{
        return items.map(item =>{
            return{key: item.id, value: item.name}
        })
    }

    return(
        <Formik
        initialValues={props.model}
        onSubmit={(values, actions)=>{
            values.genresIds=selectedGenres.map(item => item.key);
            values.movieTheatersIds=selectedMovieTheaters.map(item => item.key);
            props.onSubmit(values, actions)
        }}
        validationSchema={Yup.object({
            title: Yup.string().required('This field is required').firstLetterUppercase()
        })}
        >
            {(formikProps)=>(
                <Form>
                       <TextField displayName="Title" field="title"/>
                       <CheckboxField displayName="In Theaters" field="inTheaters" />
                       <TextField displayName="Trailer" field="trailer"/>
                       <DateField displayName="Realease Date" field="releaseDate"/>
                       <ImageField displayName="Poster" field="poster"
                            imageURL={props.model.posterURL} 
                        />

                        <MarkdownField displayName="Summary" field="summary" />
                        


                        <MultipleSelector
                            displayName="Genres"
                            nonSelected={nonselectedGenres}
                            selected={selectedGenres}
                            onChange={(selected, nonSelected)=>{
                                setSelectedGenres(selected);
                                setNonSelectedGenres(nonSelected);
                            }}
                        />

                        <MultipleSelector
                            displayName="Movie Theaters"
                            nonSelected={nonSelectedMovieTheaters}
                            selected={selectedMovieTheaters}
                            onChange={(selected, nonSelected)=>{
                                setSelectedMovieTheaters(selected);
                                setNonSelectedMovieTheaters(nonSelected);
                            }}
                        />

                      

                        
                    <Button /*disabled={formikProps.isSubmitting}*/type="submit">Save Changes</Button>
                    <Link className="btn btn-secondary" to="/genres">Cancle</Link>
                </Form>
            )}

        </Formik>
    )
}

interface movieFormProps{
    model: movieCreationDTO;
    onSubmit(
        values: movieCreationDTO,
        action: FormikHelpers<movieCreationDTO>
      ): void;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
    selectedMovieTheaters: movieTheaterDTO[];
    nonSelectedMovieTheaters: movieTheaterDTO[];
}