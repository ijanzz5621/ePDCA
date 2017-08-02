module.exports = function (app, authAdmin) {

    //Admin site
    app.get('/admin', authAdmin, function (req, res) {
        res.render('admin/home', { layout: "admin" });
    });
    app.get('/admin/login', function (req, res) {
        res.render('admin/login', { layout: null });
    });

}