Template.pagesList.onCreated(function(){

    // set the initial value
    TemplateVar.set('counter', 0);
    TemplateVar.set('createNewCloseClass', 30);

    // This will count the counter up
    this.autorun(function() {
        if(TemplateVar.get('show')) {
            // we need to wrap this to prevent this.autorun
            // reacting on the TemplateVar.get('counter')
            // Otherwise this would create an infinite loop
            //Tracker.nonreactive(function() {
            //    var count = TemplateVar.get('counter');
            //    TemplateVar.set('counter',  ++count);
            //});
        }
    });
});
Template.pagesList.helpers({
    images: function () {
        return Images.find(); // Where Images is an FS.Collection instance
    },
    pages: function(){
        return Pages.find({});
    },
    getFEContext: function () {
        var self = this;
        return {
            heightMin: 300,
            //editInPopup: true,
            //_value: self.myDoc.myHTMLField,
            _keepMarkers: false,
            _className: "thePagesContentEditor",
            //imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL', 'imageManager'],
            imageInsertButtons: ['imageBack', '|', 'imageUpload'],
            // Set some FE options
            //toolbarInline: true,
            //initOnClick: true,
            //tabSpaces: true,

            // FE save.before event handler function:
            "_onsave.before": function (e, editor) {
                // Get edited HTML from Froala-Editor
                var newHTML = editor.html.get(true /* keep_markers */);
                // Do something to update the edited value provided by the Froala-Editor plugin, if it has changed:
                //if (!_.isEqual(newHTML, self.myDoc.myHTMLField)) {
                //    console.log("onSave HTML is :"+newHTML);
                //    myCollection.update({_id: self.myDoc._id}, {
                //        $set: {myHTMLField: newHTML}
                //    });
                //}
                console.log("_onsave.before");
                //FS.Utility.eachFile(event, function(images) {
                //    Images.insert(image, function (err, imageObj) {
                //        if (err) {
                //            // handle error
                //            console.log("error happend in FS Utility");
                //        } else {
                //            // handle success depending what you need to do
                //            var userId = Meteor.userId();
                //            var imagesURL = {"profile.image": "/cfs/files/images/" + imageObj._id};
                //            Meteor.users.update(userId, {$set: imagesURL});
                //            console.log(imagesURL);
                //        }
                //    });
                //});
                //return false; // Stop Froala Editor from POSTing to the Save URL
            },
            //"_onimage.beforeUpload": function (e, editor, images) {
            "_on.beforeImageUpload": function (e, editor, images) {
                //FS.Utility.eachFile(event, function(image) {
                console.log("_onimage.beforeUpload");
                for (var i = 0, ln = images.length; i < ln; i++) {
                    Images.insert(images[i], function (err, fileObj) {
                        if (err) {
                            console.log(err);
                        } else {
                            var imagesURL = {"profile.image": "/cfs/files/images/" + fileObj._id};
                            console.log(imagesURL);
                        }
                    });
                }
                    //Images.insert(images, function (err, fileObj) {
                    //    if (err) {
                    //        // handle error
                    //        console.log("error happend in FS Utility");
                    //    } else {
                    //        // handle success depending what you need to do
                    //        console.log("startign upload inserting.....");
                    //        var userId = Meteor.userId();
                    //        console.log(userId);
                    //        var imagesURL = {"profile.image": "/cfs/files/images/" + fileObj._id};
                    //        console.log(imagesURL);
                    //        Meteor.users.update(userId, {$set: imagesURL});
                    //    }
                    //});
                //});
            }
        }
    }
});

Template.pagesList.events({
    'click button': function() {
        TemplateVar.set('show',  !TemplateVar.get('show'));
    },
    'click #saveContentForPage': function () {
        console.log($('.thePagesContentEditor').froalaEditor('html.get'));
        //$('#saveContentForPage').froalaEditor('save.save');
    }
});