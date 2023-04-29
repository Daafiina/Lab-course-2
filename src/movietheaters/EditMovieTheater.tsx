import MovieTheaterForm from "./MovieTheaterForm";

export default function EditMovieTheater(){
    return(
        <>
            <h3>Edit Movie Theater</h3>
            <MovieTheaterForm
                model={{name:'Prishtine', 
                latitude: 42.66309936129494,
                longitude: 21.16679191589356}}
                onSubmit={values=>console.log(values)}
            />
        </>
    )
}