const db = require('../db/config');
const User = {};
//User model

User.findUserName = userName => {
    return db.oneOrNone(`
    SELECT * FROM users
    WHERE username = $1
    `,[userName]);
};

User.create = user =>{
    return db.one(`
    INSERT INTO users
    (username, email, password_digest)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,[user.username, user.email, user.password_digest]);
}

module.exports = User;