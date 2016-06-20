Meteor.methods({
    insertNewInventory: function (doc) {
        check(doc, Schemas.Inventories);
        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        console.log("insertMehotd started");
        console.log(doc);
        //console.log("********");
        //console.log(updateDoc);
        //console.log("********");
        //console.log(currentDoc);
        console.log("********||||||");
        //Tasks.insert({
        //    text: text,
        //    createdAt: new Date(),
        //    owner: Meteor.userId(),
        //    username: Meteor.user().username
        //});
    },
});