Meteor.methods({
    insertNewInventory: function (doc) {

        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            if ( !Roles.userIsInRole(Meteor.userId(), ['admin'], doc.group)
                && !Roles.userIsInRole(Meteor.userId(), ['super-admin'], 'techchaps')) {
                throw new Meteor.Error(403, "Access denied")
            }
        }
        if (Inventories.findOne({'group':doc.group})) {
            throw new Meteor.Error("Inventory list already exists")
        }
        console.log(
            Inventories.insert(doc)
        );

    },
});