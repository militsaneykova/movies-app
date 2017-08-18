const db = require('../db/config');

const Movie = {};

// Selecting All Movies
Movie.findAll = () => {
  return db.query(`SELECT * FROM movies`);
}

Movie.create = (movie, userid) => {
  return db.one(
    `
    INSERT INTO movies
    (title, description, genre, user_id)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `, [movie.title, movie.description, movie.genre, userid]);
}
/* 
  (By ID / $1 params)
  Instead of putting the id variable right in the query, we use the $1 syntax, 
  and then pass a second argument to the method. The second argument is an array 
  that contains all of the values for the items we need in our SQL query. 
  This is a security measure that prevents something called SQL injection. 
*/
Movie.findById = id => {
  return db.one(
    `
    SELECT * FROM movies
    WHERE id = $1
    `, [id]);
}

Movie.update = (movie, id) => {
  return db.one(
    `
    UPDATE movies SET
    title = $1,
    description = $2,
    genre = $3
    WHERE id = $4
    RETURNING *
    `, [movie.title, movie.description, movie.genre, id]);
}

// Deleting A Movie 
Movie.destroy = id => {
  return db.none(
    `
    DELETE FROM movies
    WHERE id = $1
    `, [id]);
}