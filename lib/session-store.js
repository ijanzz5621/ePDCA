var credentials = require('../credentials');

module.exports = function (app, session) {

    var MySQLStore = require('express-mysql-session')(session);
    var options = {
        host: credentials.mysql.host,
        port: credentials.mysql.port,
        user: credentials.mysql.username,
        password: credentials.mysql.password,
        database: credentials.mysql.sessionDatabase,
        schema: {
            tableName: credentials.mysql.sessionTableName,
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        },
        checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds. 
        expiration: 86400000,// The maximum age of a valid session; milliseconds. 
        createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist. 
        connectionLimit: 1,// Number of connections when creating a connection pool 
    };

    var sessionStore = new MySQLStore(options);

    app.use(session({
        key: credentials.sessionCookieName,
        secret: credentials.sessioncookieSecret,
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));

}