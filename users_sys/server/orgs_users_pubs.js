Meteor.publishComposite('orgs', {
    find: function () {
        if (Roles.userIsInRole(this.userId, ['view-secrets','admin'], group)) {

            return Meteor.secrets.find({group: group});

        } else {

            // user not authorized. do not publish secrets
            this.stop();
            return;

        }

        return Orgs.find({});
    }
});
//todo: check() Match.Test() and groups/roles permission test