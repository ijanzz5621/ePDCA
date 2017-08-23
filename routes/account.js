var encryptor = require('../lib/lib_encryptor');
var commonController = require('../lib/dbCommand');

module.exports = function (app, auth) {

    app.get('/accounts/forgot-password', function (req, res) {
        res.render('accounts/forgot-password', { layout: "anonymous" });
    });

    app.post('/accounts/forgot-password', function (req, res) {

        var rtnMsg = "<h3>Your password has been sent</h3> <br/>Please check your email. You will receive a temporary password and please login using the password.";
        //console.log("email= " + req.body.email);

        //Check if email exist
        commonController.executeQuery("select * from admin_user where Email = '" + req.body.email + "'").then(function (result) {
            //console.log(result);
            //console.log("Username: " + result[0].Username);

            if (result.length > 0) {
                //console.log('record found');
                //Proceed
                //generate random password
                //Create random password
                var passwordOri = Math.random()                        // Generate random number, eg: 0.123456
                    .toString(36)                                           // Convert  to base-36 : "0.4fzyo82mvyr"
                    .slice(-8);
                //console.log("original password= " + passwordOri);                              // Cut off last 8 characters : "yo82mvyr"

                //convert to hash and save to database
                //update last login to null so that 
                //system can redirect to change password after login first time after reset
                var passwordHash = encryptor.generateHashCode(passwordOri);
                //console.log("hash password= " + passwordHash);
                commonController
                    .executeQuery("update admin_user set Password = '" + passwordHash + "' where Email = '" + req.body.email + "'")
                    .then(function (result) {

                        //console.log(result);
                        //send email (send ori password without hash)
                        var email = require('../lib/lib_email');
                        email.setMailOptions(req.body.email, 'ePDCA - Reset password', '', 'Please use password <strong>' + passwordOri + '</strong> to login.');
                        email.sendMail();

                        res.render('accounts/forgot-password-sent', { layout: "anonymous", returnMessage: rtnMsg });

                    })
                    .catch(function(reason){
                        console("Error return here: " + reason);
                    });




            } else {
                //console.log('record not found');
                rtnMsg = "<h3>Opppsss!</h3> <br/>Your email is not registered. Please check with admin for registration.";
                res.render('accounts/forgot-password-sent', { layout: "anonymous", returnMessage: rtnMsg });
            }

        });


    });

    app.get('/accounts/reset-password', function (req, res) {
        res.render('accounts/reset-password', { layout: "anonymous" });
    });

    app.get('/accounts/change-password', auth, function (req, res) {
        res.render('accounts/change-password', {  });
    });
    app.post('/accounts/change-password', function (req, res) {

        var txtCurrentPassword = req.body.txtCurrentPassword;
        var txtNewPassword = req.body.txtNewPassword;
        var txtNewPassword2 = req.body.txtNewPassword2;
        var messageType = "success";

        //convert password to hash before compare with database
        var passwordHash = encryptor.generateHashCode(txtCurrentPassword);
        var isSuccess = "False";

        commonController
            .executeQuery("select * from admin_user where Email = '" + req.session.user + "' and password = '" + passwordHash + "'")
            .then(function (result) {
                //console.log(result);

                if (result.length > 0){
                    //match
                    //Update database with the new password
                    var passwordHashNew = encryptor.generateHashCode(txtNewPassword);
                    commonController
                        .executeQuery("update admin_user set Password = '" + passwordHashNew + "', LastLogin = now() where Email = '" + req.session.user + "';")
                        .then(function(result){
                            res.render('accounts/change-password', {  
                                isSuccess: "True",
                                messageType: messageType,
                                returnMessage: "Congratulations! Your password has been changed." 
                            });
                        });
                } else {
                    messageType = "error";
                    //not match
                    res.render('accounts/change-password', {  
                        isSuccess: "False",
                        messageType: messageType,
                        returnMessage: "Current password incorrect. Please try again." 
                    });
                }

            });

        
    });

}