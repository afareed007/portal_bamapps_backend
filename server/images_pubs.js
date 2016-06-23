Meteor.publish('images', function tasksPublication() {
    return Images.find();
});
Images.allow({
    insert: function () {
        return true;
    },
    download: function(userId, fileObj) {
        return true
    }
});
