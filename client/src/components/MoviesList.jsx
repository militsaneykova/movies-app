import React from 'react';
import Movie from 'Movie';

const MoviesList = (props) => {
    return (
        <div className='movies-list'>
            {props.movieData.map(movie => {
                return <Movie movie={movie} key={movie.id} />
            })}
        </div>
    )
}

export default MoviesList;