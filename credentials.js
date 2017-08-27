module.exports = {

    sessioncookieSecret: 'ch@rm1n9'
    , sessionCookieName: 'ePDCACookies'

    , domainPath: 'http://localhost:8080/'

    , mysql: {
        host: 'localhost'
        , port: 3306
        , username: 'root'
        , password: 'ch@rm1n9'
        , liveDatabase: 'ePDCA_Live'
        , testDatabase: 'ePDCA_Test'
        , sessionDatabase: 'session_epdca'
        , sessionTableName: 'sessions'
    },

    adminPassword: '123qweASDF',

    email: {
        host: "smtp.gmail.com"
        , port: 465
        , secure: true
        , auth: {
            user: 'ijglobaltech.mail@gmail.com',
            pass: 'ijanPHT6420'
        } 
    }

}