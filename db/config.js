// this will log every query
const options = {
    query: (e) => {
        console.log(e.query);
    }
}

//requiring pg-promise
const pgp = require('pg-promise')(options);

//function for setting the NODE environment
function setDatabase () {
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
        return pgp ({
            database: 'movies_p3_dev',
            port: 5432,
            hot: 'localhost',
        })
    } else {
        return pgp(process.env.DATABASE_URL);
    }
}

//calling the db function
const db = setDatabase();

//exporting db
module.exports = db;