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

Template.pagesList.rendered = function() {
    var template = this;
    var element = this.$('.thePagesContentEditor');
    $('.thePagesContentEditor').on('beforeImageUpload', function (e, editor, images) {
        var self = $(this);
        var file = images[0];
        console.log('starting image uploade from froala');
        var fsFile = new FS.File(file);
        fsFile.metadata = {foo: "bar"};
        console.log(fsFile);
        Images.insert( fsFile, function (err, fileObj) {
            console.log('id: ',fileObj._id);

            cursor = Images.find(fileObj._id);
            cursor.observeChanges({
                added: function (id, fields) {
                    console.log('added to tge cursor');
                },
                changed: function (id, fields) {
                    var url = fileObj.url();
                    console.log("changed!", url);
                    console.log('File: ',fileObj.foo);
                    self.editable('writeImage', url, true);
                }
            });
        });
    });
    $('#pagecontent').summernote({
        height: 400,
        maxHeight:800,
        minHeight:250,
        callbacks: {
            onImageUpload: function(files, editor, $editable) {
                var file = files[0];
                var fsFile = new FS.File(file);
                fsFile.foo ="bar";
                Images.insert(fsFile, function(err, fileObj) {
                    console.log("after insert:", fileObj._id);
                    template.autorun(function(c) {
                        fileObj = Images.findOne(fileObj._id);
                        var url = fileObj.url();
                        if (url) {
                            $("#pagecontent").summernote("insertImage", fileObj.url(), "Image Title");
                            //editor.insertImage($editable, url);
                            c.stop();
                        }
                    }, {
                        tx: true
                    });
                    cursor = Images.find(fileObj._id);
                    cursor.observeChanges({
                        changed: function (id, fields) {
                            console.log('File: ',fileObj.foo);
                        }
                    });
                });
            }
        }
    });
};

Template.pagesList.helpers({



    images: function () {
        return Images.find(); // Where Images is an FS.Collection instance
    },
    pages: function(){
        return Pages.find({});
    },
    "imagePasted": function () {
        console.log("imagePsted used 2232232");
        var self = this;
        //return function (e, editor, img) {
        //
        //};
        return false;
    },
    "getFEContext": function () {
        var self = this;
        var thisLink  = '/upload_image/AaqJGmPL32eLjrp6B';
        Session.set('thisLink', thisLink);
        var imagesURL;
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
            //
            //
            //"_onimage.beforeImageUpload": function (e, editor, response) {
            //    console.log("_onimage.uploaded");
            //    console.log("---------------------");
            //
            //    console.log('starting image uploade from froala');
            //    var self = $(this);
            //    var file = images[0];
            //    var fsFile = new FS.File(file);
            //    fsFile.foo ="bar";
            //    console.log(fsFile);
            //
            //    Images.insert( fsFile, function (err, fileObj) {
            //        cursor = Images.find(fileObj._id);
            //        console.log(cursor);
            //        cursor.observeChanges({
            //            changed: function (id, fields) {
            //                var url = fileObj.url();
            //                console.log("changed!", url);
            //                console.log('File: ',fileObj.foo);
            //                self.editable('writeImage', url, true);
            //            }
            //        });
            //    });
            //
            //},

            //fileUploadMethod: 'PUT',
            //imageUploadMethod: 'PUT',
            //imageUploadParam: 'image_param',
            //imageUploadParams: {id: 'my_editor'},
            ////imageUploadURL: '/upload_image/JhvMHcgS3HpSgys88'
            //imageUploadURL: Session.get('thisLink'),


            "_onimage.error": function (e, editor, error, response) {
                console.log(error);
            }

            //imageUploadParams: {
            //    id: 'my_editor'
            //},
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