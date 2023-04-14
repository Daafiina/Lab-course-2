import { Link } from "react-router-dom";

export default function IndexActiors(){
    return(
        <>
            <h3>Actors</h3>
            <Link className="btn btn-primary" to="/actors/create">Create actor</Link>

        </>
    )
}