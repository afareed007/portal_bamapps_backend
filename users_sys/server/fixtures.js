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
        {name:"AdminUser-Af",email:"ahmed@techchaps.co.uk",roles:['super-admin'], group:"techchaps"},
        {name:"AdminUser-Af1",email:"afareed92@gmail.com",roles:['super-admin'], group:"techchaps"},
        {name:"AdminUser-Af1",email:"afareed92@gmail.com",roles:['admin'], group:"lhs"},


        {name:"super-admin-TC",email:"super_admin@techchaps.co.uk",roles:['super-admin'], group:"techchaps-admins"},
        {name:"admin-TC",email:"admin@techchaps.co.uk",roles:['admin'], group:"techchaps-admins"},
        {name:"user-TC",email:"user@techchaps.co.uk",roles:['user'], group:"techchaps-admins"},

        {name:"super-admin-TC",email:"super_admin@techchaps.co.uk",roles:['moderator'], group:"techchaps-web"},


        {name:"moderator-TC",email:"moderator@techchaps.co.uk",roles:['moderator'], group:"techchaps-web"},
        {name:"publisher-TC",email:"publisher@techchaps.co.uk",roles:['publisher'], group:"techchaps-web"},
        {name:"writer-TC",email:"writer@techchaps.co.uk",roles:['writer'], group:"techchaps-web"},
    ];
    _.each(users, function (userData) {
        if (!Accounts.findUserByEmail(userData.email)) {
            console.log("user with email does not exists");
            console.log("creating the user: ", userData.email, userData.name);
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
//org / groups / roles
//orgs name: techchaps, lhs, clasp
//orgs initials: techchaps, lhs, clasp

//groupsName: techchaps-admins roles: super-admin
//groupsName: techchaps-admins roles: admin
//groupsName: techchaps-admins roles: user
//groupsName: techchaps-web roles: moderator << publish/remove content
//groupsName: techchaps-web roles: publisher << publish/edit published content
//groupsName: techchaps-web roles: writer << draft/edit draft content to mod by publisher/moderator
