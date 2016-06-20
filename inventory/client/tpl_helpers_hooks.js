Template.registerHelper('equals',
    function(v1, v2) {
        return (v1 === v2);
    }
);
Template.registerHelper('userPrimaryEmail',
    function() {
        if (Meteor.user()){
            return Meteor.user().emails[0].address;
        }
    }
);
Template.registerHelper('loggedIn', function(){
    return Meteor.userId()
});
//Template.registerHelper('isAdmin', function() {
//    return Roles.userIsInRole( this.userId, ['admin'], this.group)
//    }
//);