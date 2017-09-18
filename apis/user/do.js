var credentials = require('../../credentials');

module.exports = function (app) {

    app.post('/api/do-get-actualrootcauselist', function (req, res) {
        var blDo = require('../../business-logic/user/do');

        blDo.getDoActualRootcauseList(req.session.user)
            .then(function(result){
                res.send(result);
            });
    });

    app.post('/api/do-get-actualrootcausedetails', function (req, res) {
        var blDo = require('../../business-logic/user/do');

        var rootcauseID = req.body.rootcauseID;
        blDo.getDoActualRootcauseDetails(rootcauseID)
            .then(function(result){
                res.send(result);
            });
    });

}