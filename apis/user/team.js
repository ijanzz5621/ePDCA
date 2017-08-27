var credentials = require('../../credentials');

module.exports = function (app) {

    app.post('/api/team-get-user', function (req, res) {
        var blTeam = require('../../business-logic/user/team');
        blTeam.getTeamMembers(req.session.user)
            .then(function(result){
                res.send(result);
            });
    });

};


        

