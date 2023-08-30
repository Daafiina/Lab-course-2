import React, { useState } from "react";
import { movieDTO } from "./movies.model";
import css from './IndividualMovie.module.css';
import { Link } from "react-router-dom";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState<movieDTO[]>(
        JSON.parse(localStorage.getItem("wishlist") || "[]")
    );

    const removeFromWishlist = (id: number) => {
        const updatedWishlist = wishlist.filter(item => item.id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    return (
       
<div className={css.div}>
    <div className={css.moviecontainer} style={{display:'flex'}}>
        {wishlist.length > 0 ? (
            wishlist.map((item: movieDTO) => (
                <div key={item.id} style={{marginRight:'3REM'}}>
                    <Link to={`/movie/${item.id}`} className={css.movielink} style={{marginBottom:'-2REM'}}>
                        <img alt="Poster" src={item.poster} className={css.movieposter} />
                        <p className={css.movietitle}>{item.title}</p><br />
                    </Link>
                    <div style={{textAlign:'center'}}>
                        <button onClick={() => removeFromWishlist(item.id)} style={{backgroundColor:'#dedede', color:'black', border:'0.5px solid darkgrey'}}>Remove from Wishlist</button>
                    </div>
                </div>
            ))
        ) : (
            <div className="alert alert-primary" role="alert" style={{width:'100%'}}>
                There are no elements in the wishlist currently!
            </div>
        )}
    </div>
</div>




    );
};

export default Wishlist;
