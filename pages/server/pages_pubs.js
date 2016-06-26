Meteor.publishComposite('pages', {
    find: function () {
        // Find top ten highest scoring posts
        return Pages.find({});
    }
});
