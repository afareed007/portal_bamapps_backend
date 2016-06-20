////////////////////////////////////////////////////////////////////
// Startup Fixtures
//
Meteor.startup(function () {
    // only use once on the new server hosting. comment out or remove after that. STRICTly follow.
    addUpdateUsersRoles();
    var userAccts = Meteor.users.find().fetch();
    _.each(userAccts, function (user) {
        console.log(user._id);
    });
});

function addUpdateUsersRoles () {
    var users;
    users = [
        {name:"AdminUser-Af",email:"afareed92@gmail1.com",roles:['super-admin'], group:"techchaps"},
        {name:"AdminUser-Af",email:"afareed92@gmail.com",roles:['super-admin'], group:"techchaps"},
        {name:"AdminUser-Af",email:"afareed92@gmail.com",roles:['admin'], group:"lhs"}
    ];
    _.each(users, function (userData) {
        if (!Accounts.findUserByEmail(userData.email)) {
            console.log("user with email does not exists");
            console.log("creating the user");
            var id = Accounts.createUser({
                email: userData.email,
                password: "apple1",
                profile: {name: userData.name},
                username: userData.name
            });
        } else {
            var acctUsr = Accounts.findUserByEmail(userData.email) || null;
            id = acctUsr._id;
        }
        Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});
        Roles.addUsersToRoles(id, userData.roles, userData.group);
    });
}