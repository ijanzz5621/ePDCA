//import controller
var planController = require('../controllers/plan/plan');
var blPlan = require('../business-logic/user/plan');
var lib_mysql = require('../lib/lib_mysql');
var teamController = require('../business-logic/user/team');
var commonController = require('../lib/dbCommand');
var encryptor = require('../lib/lib_encryptor');

var credentials = require('../credentials');

module.exports = function (app, auth) {

    //user site
    app.get('/user/plan', auth, function (req, res) {
        pageTitle = "Plan";

        /*var result = planController.getAll(function (err, rows) {
            if (err)
                console.log(err);
            else
                console.log(rows);
        });*/

        //render plan-submitted page
        res.render('user/plan/plan');
    })

    //Do
    app.get('/user/do', auth, function (req, res) {
        res.render('user/do/do', { result: "Record save successfully!" });
    })

    app.get('/user/plan-add', auth, function (req, res) {
        res.render('user/plan/plan-add');
    })
    //post
    app.post('/user/plan-add', function(req, res, next){
        //call controller to save plan
        blPlan.saveNewPlan(req.session.user, req.body);
        res.render('user/plan/plan-submitted', { teamleadName: "Sharizan Redzuan" });
        //res.redirect('/user/plan-submitted', { teamleadName: "Sharizan Redzuan" });
    });

    //plan root cause
    app.get('/user/plan-root-cause/:planGuid', function(req, res){

    });

    app.get('/user/create', auth, function (req, res) {
        res.render('user/create/create');
    });
    app.get('/user/action', auth, function (req, res) {
        res.render('user/action/action');
    });

    //team routers
    app.get('/user/team', auth, function(req, res){
        var personList = [];

        teamController.getTeamMembers(req.session.user)
            .then(function(rows){
                //console.log(result[0].Email);
                
                for (var i = 0; i < rows.length; i++) {
                    var person = {
                        'Username':rows[i].Username,
                        'Gender':rows[i].Gender,
                        'Email':rows[i].Email,
                        'UserCode':rows[i].UserCode,
                        'GroupName': rows[i].GroupName
                    }
                    // Add object into array
                    personList.push(person);
                }
                //console.log(personList);

                res.render('user/team/team', {teamData: JSON.stringify(personList)});
            })
            .catch(function(err){
                res.render('500', {err: err});
            });

    });

    app.post('/user/invite-user', function(req, res){
        var emailTo = req.body.txtEmail;
        var username = req.body.txtUsername;
        var usercode = req.body.txtUserCode;
        var gender = req.body.rbGender;
        //console.log('Gender: ' + gender);

        var sql = "";

        commonController.executeQuery("select * from admin_user where Email='" + req.session.user + "'")
            .then(function(result){

                if (result.length > 0){

                    var passwordOri = Math.random()                        // Generate random number, eg: 0.123456
                    .toString(36)                                           // Convert  to base-36 : "0.4fzyo82mvyr"
                    .slice(-8);

                    var passwordHash = encryptor.generateHashCode(passwordOri);

                    sql = "insert into admin_user (Email, RecGuid, CompanyCode, DepartmentCode, UserCode, Username, Password, Gender, SupervisorId, Status, CreatedOn) " +
                    "values ('" + emailTo + "', uuid(), '" + result[0].CompanyCode + "', '" + result[0].DepartmentCode + "', '" + usercode + "', '" + username + "', '" + passwordHash + "', '" + gender + "', '" + req.session.user + "', 'A', now())";
                    commonController.executeQuery(sql)
                        .then(function(result2){

                            //send email to newly created user
                            var email = require('../lib/lib_email');
                            var content = "Congratulations! <br/> You have been invited from your supervisor (" + req.session.user + ") to join ePDCA system. <br/> " +
                            "Please use password <strong style='font-size:24px;'>" + passwordOri + "</strong> to login. " +
                            "<br/><br/> Click <a href='" + credentials.domainPath + "login'>here</a>";
                            email.setMailOptions(emailTo, 'ePDCA - Invitation', '', content);
                            email.sendMail();

                            res.redirect('/user/team');

                        });
                }
                else {
                    res.render('/user/team', { errorMessage: "No record found for login user" });
                }

            });

    });

}