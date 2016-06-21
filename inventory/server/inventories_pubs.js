Meteor.publish('inventories', function (group) {
    if (Roles.userIsInRole(this.userId, ['super-admin'], group)) {
        return Inventories.find({});
    } else if (Roles.userIsInRole(this.userId, ['member', 'admin'], group)) {
        return Inventories.find({group: group});
    } else {
        // user not authorized. do not publish inventories
        this.stop();
        return;
    }
});