import ActorForm from "./ActorForm";

export default function EditActor(){
    return(
        <>
            <h3>Edit Actor</h3>
            <ActorForm model={{name:'Tom Holland',
            dateOfBirth:new Date('1994-06-01T00:00:00'),
            biography:`# Something
    This person was born in **DR**`,
            pictureURL:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Selena_Gomez_at_White_House.jpg/330px-Selena_Gomez_at_White_House.jpg'
        }}
                onSubmit={values=>console.log(values)}
            />
        </>
    )
}