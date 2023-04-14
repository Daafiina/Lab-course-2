import { useHistory } from "react-router";
import Button from "../utilis/Button";

export default function CreateGenres(){
    const history=useHistory();
    return(
        <>
            <h3>Create Genre</h3>
            <Button onClick={() =>{
                //..saving in the db
                history.push('/genres');
            }}>Save Changes</Button>
        </>
    )
}