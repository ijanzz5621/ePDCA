var db = require('../../lib/db');

exports.create = function(probStatement, teamLead, done){
    var values = [probStatement, teamLead, new Date().toISOString()];

    db.get().query('INSERT INTO user_plan_master (ProbStatement, TeamLead, CreatedOn) VALUES (?, ?, ?)', values, function(err, result){
        if (err) return done(err);
        done(null, result.insertId);
    });
}

exports.getAll = function(done){
    db.get().query('SELECT * FROM user_plan_master', function(err, rows){
        if (err) return done(err);
        done(null, rows);
    });
};

exports.getAllByUser = function(userId, done){
    db.get().query('SELECT * FROM user_plan_master WHERE CreatedBy = ?', userId, function(err, rows){
        if (err) return done(err);
        done(null, rows);
    });
};
