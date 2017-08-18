const Movie = require('../models/movie');

const movieController = {};

/* 
  (Show All Movies)
  When the query goes to the database, 
  $1 will be replaced with the first thing in the array, the id. 
*/

movieController.index = (req, res) => {
  Movie.findAll()
  .then(movies => {
    res.json({
      data: movies,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

/* 
  (Create A Movie)
  Adding a new movie using body parsed data 
*/

movieController.create = (req, res) => {
  Movie.create({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
  }, req.user.id).then(() => {
    res.redirect('/movies');
  }).catch(err => {
    res.status(500).json(err);
  });
}

/* 
  (Update A Movie)
  Updating a new movie using body parsed data 
*/

movieController.update = (req, res) => {
  Movie.update ({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
  }, req.params.id).then(movie => {
    res.json({
      data: movie,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}


/* 
  (Show One Movie)
  We're passing req.params.id into the model's method and getting 
  a movie back from the database and sending it as json.
*/

movieController.show = (req, res) => {
  Movie.findById(req.params.id)
  .then(movie => {
    res.json({
      data: movie,
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
}

/* 
  (Delete One Movie)
  We're passing req.params.id into the model's method to delete 
  and sending a message back stating it's been deleted.
*/

movieController.delete = (req, res) => {
  Movie.destroy(req.params.id)
  .then(() => {
    res.json({
      message: 'Movie is sucessfully deleted',
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

module.exports = movieController;