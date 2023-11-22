import { Link } from "react-router-dom";
import Button from "../utilis/Button";
import css from "./IndividualActor.module.css";
import axios from "axios";
import { actorDTO } from "./actors.model";

export default function IndividualActor(props: actorDTO) {
  const buildLink = () => `/actors/${props.id}`;
  const editLink = `/actors/edit/${props.id}`; // Edit link

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this actor?")) {
      try {
        await axios.delete(`https://localhost:7194/api/actors/${props.id}`);
        console.log("Actor deleted successfully");
      } catch (error) {
        console.error("Error deleting actor", error);
      }
    }
  };

  return (
    <div className={css.div}>
      <div className={css.actorcontainer}>
        <Link to={buildLink()} className={css.actorlink}>
          <img alt="Actor" src={props.picture} className={css.actorposter} />
          <p className={css.actorName}>{props.name}</p>
        </Link>

        {/* Edit button */}
        <Link to={editLink} style={{marginRight: '1rem'}} className="btn btn-info">
            Edit
        </Link>

        {/* Delete button */}
        <Button            className="btn btn-danger"
 onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
