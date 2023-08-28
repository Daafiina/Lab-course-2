export default function DisplayErrors(props: displayErrorsProps){
    const style = {color: 'blue'};
    return (
        <>
            {props.errors ? <ul style={style}>
                {/* {props.errors.map((error, index) => <li key={index}>{error}</li>)} */}
            </ul>: null}
        </>
    )
}

interface displayErrorsProps{
    errors?: string[];
}