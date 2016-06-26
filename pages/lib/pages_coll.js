//schema
Pages = new Mongo.Collection('pages');
Pages.attachSchema(new SimpleSchema({
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
Pages.helpers({
    //allPages() {
    //    return Pages.find({});
    //}
});
//todo: instead of allow add method to insert pages

var imageStore = new FS.Store.GridFS("images", {
    maxTries: 5, // optional, default 5
    chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                          // Default: 2MB. Reasonable range: 512KB - 4MB
});

Images = new FS.Collection("images", {
    stores: [imageStore],
    filter: {
        maxSize: 1048576, // in bytes
        //allow: {
        //    contentTypes: ['image/*'],
        //    extensions: ['png']
        //},
        //deny: {
        //    contentTypes: ['image/*'],
        //    extensions: ['png']
        //},
        onInvalid: function (message) {
            if (Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
        }
    }
});

Images.allow({
    insert: function(){
        //if (Meteor.userId()){
        //    return true;
        //}
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    download: function(userId, fileObj) {
        return true
    }
});