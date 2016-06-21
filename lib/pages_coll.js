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
        label: "Yet another poem",
        max: 200,
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor', // optional
                settings: {
                    callbacks: {
                        onImageUpload: function(files) {
                            console.log('on Image Pload summernote');
                            // upload image to server and create imgNode...
                            var imgNode = "http://www.da-files.com/artnetwork/zeitgeist/top-5-dragons/img-18.jpg";
                            pagesInsert.summernote('insertNode', imgNode);
                        }
                    }
                }
            }
        }
    }
}));
Pages.helpers({
    //allPages() {
    //    return Pages.find({});
    //}
});

var imageStore = new FS.Store.GridFS("images");

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


Images.deny({
    insert: function(){
        return false;
    },
    update: function(){
        return false;
    },
    remove: function(){
        return false;
    },
    download: function(){
        return false;
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
    download: function(){
        return true;
    }
});