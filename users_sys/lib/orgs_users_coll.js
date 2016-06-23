//schema
Orgs = new Mongo.Collection('orgs');
Orgs.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: 'Title',
        max: 200
    },
    content: {
        type: String,
        label: "Content",
        max: 2000,
    }
}));
Orgs.helpers({
    allPages: function() {
        return Pages.find({});
    }
});
