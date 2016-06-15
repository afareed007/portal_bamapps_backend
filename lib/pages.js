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
                froalaOptions: {
                    type: 'froala',
                    theme: 'red',
                    inlineMode: false
                }
            }
        }
    }
}));
Pages.helpers({
    allPages() {
        return Pages.find({});
    }
});

var imageStore = new FS.Store.GridFS("images");

Images = new FS.Collection("images", {
    stores: [imageStore]
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