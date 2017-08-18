import React from 'react';

const Movie = (props) => {
    return (
        <div className='movie'>
            <h3>{props.title}</h3>
            <p>{props.movie.description}</p>
            <p>Genre: {props.movie.genre}</p>
            
        </div>
    )
}

export default Movie;