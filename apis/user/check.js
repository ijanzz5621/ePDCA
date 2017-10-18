var credentials = require('../../credentials');

module.exports = function (app) {

    app.post('/api/check-get-actionlist', function (req, res) {
        var blCheck = require('../../business-logic/user/check');

        //console.log(req.session.user);

        blCheck.getCheckActions(req.session.user)
            .then(function(result){
                res.send(result);
            });
    });

}