Meteor.publishComposite('pages', {
    find: function () {
        // Find top ten highest scoring posts
        return Pages.find({});
    }
});
Pages.allow({
    insert: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});
