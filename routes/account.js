module.exports = function (app) {

    app.get('/accounts/forgot-password', function (req, res) {
        res.render('accounts/forgot-password', { layout: "anonymous" });
    });

    app.post('/accounts/forgot-password', function (req, res) {

        //generate random password

        //convert to hash

        //send email

        res.render('accounts/forgot-password-sent', { layout: "anonymous" });
    });

    app.get('/accounts/reset-password', function (req, res) {
        res.render('accounts/reset-password', { layout: "anonymous" });
    });

}