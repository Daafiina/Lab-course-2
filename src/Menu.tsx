import { Link, NavLink } from "react-router-dom";
import Authorized from "./auth/Authorized";
import Button from "./utilis/Button";
import { logout } from "./auth/handleJWT";
import AuthenticationContext from "./auth/AuthenticationContext";
import { useContext } from "react";

export default function Menu(){

    const {update, claims} = useContext(AuthenticationContext);

    function getUserEmail(): string{
        return claims.filter(x => x.name === "email")[0]?.value;
    }

    return(
        <>
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">BMM</NavLink>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/movies">
            All Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/movies/filter">
            Filter Movies
          </NavLink>
        </li>
        <li className="">
                  <NavLink className="nav-link" to="/wishlist">
                    View Wishlist
                  </NavLink>
              </li>
        <Authorized
          role="admin"
          authorized={
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/genres">
                  Genres
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/actors">
                  Actors
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/movietheaters">
                  Movie Theaters
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/movies/create">
                  Create a Movie
                </NavLink>
              </li>
           
            </>
          }
        />
      </ul>
      <div className="d-flex">
        <Authorized
          authorized={
            <>
              <span className="nav-link">Hi, {getUserEmail()}</span>
              <Button
                onClick={() => {
                  logout();
                  update([]);
                }}
                className="nav-link btn btn-link"
              >
                Log out
              </Button>
            </>
          }
          notAuthorized={
            <>
              <Link to="/register" className="nav-link btn btn-link">
                Register
              </Link>
              <Link to="/login" className="nav-link btn btn-link">
                Login
              </Link>
            </>
          }
        />
      </div>
    </div>
  </div>
</nav>

        
        </>
    )
}