// config/passport.js
var mysql = require('mysql')
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// MySQL connection
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'personsdb'
});
connection.connect();
console.log("MySQL connection created at %s with database: %s", connection.config.host, connection.config.database);

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        console.log("Serialize");
        console.log(user);
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {

        connection.query("select * from users where id = " + id, function (err, rows) {
            console.log("Deserialize");
            console.log(rows[0]);
            done(err, rows[0]);
        })
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {

        }));
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            var select = 'SELECT * FROM users WHERE email = ? AND password = ?'
            connection.query(select, [email, password], function (err, rows, fields) {
                if (err) {
                    return done(err);
                }
                else if (rows.length == 0) {
                    return done(null, false, {
                        message: 'Incorrect email.'
                    });
                } else {
                    console.log(rows[0]);
                    //return done(null, {user : { 'id': rows[0].id, 'email': rows[0].email, 'password': rows[0].password }});
                    return done(null, rows[0]);
                }
            })

        }));
};