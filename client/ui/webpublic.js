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
//Template.pagesList.onRendered(function(){
//
//    var $summernote = $('#pagesInsert');
//    $summernote.summernote({
//        onImageUpload: function(files) {
//
//            var imagesURL =[];
//            var filename;
//            var $dom =[];
//
//            console.log('on Image Pload summernote');
//            // upload image to server and create imgNode...
//            var imgNode = "http://www.da-files.com/artnetwork/zeitgeist/top-5-dragons/img-18.jpg";
//            pagesInsert.summernote('insertNode', imgNode);
//
//            //for (var i = 0, ln = files.length; i < ln; i++) {
//            //    Images.insert(files[i], function (err, fileObj) {
//            //        if (err){
//            //            console.log(err);
//            //        } else {
//            //            console.log(fileObj)
//            //            imagesURL[i] = '/cfs/files/images/' + fileObj._id;
//            //            Photos.insert({
//            //                url: imagesURL[i]
//            //            });
//            //        }
//            //    });
//            //
//            //    $dom[i] = $("<img>").attr('src',imagesURL[i]);
//            //    $summernote.summernote("insertNode", $dom[i]);
//            //}
//
//        }
//    });
//
//});

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
        console.log('inside first getFEContext');
        return {


            //imageUploadToS3: {
            //    bucket: '',
            //    // Your bucket region.
            //    region: 's3-eu-west-1',
            //    keyStart: 'uploads/',
            //    callback: function (url, key) {
            //        // The URL and Key returned from Amazon.
            //        console.log (url);
            //        console.log (key);
            //    },
            //    params: {
            //        acl: 'public-read', // ACL according to Amazon Documentation.
            //        AWSAccessKeyId: '' // Access Key from Amazon.
            //        //policy: 'POLICY_STRING', // Policy string computed in the backend.
            //        //signature: '', // Signature computed in the backend.
            //    }
            //},

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
            "_onimage.beforeUpload": function (e, editor, images) {   //"_on.beforeImageUpload": function (e, editor, images) {

                var newHTML = editor.html.get(true /* keep_markers */);

                console.log("the comment inside onsave.before: ${newHtml}");

                //FS.Utility.eachFile(event, function(image) {
                console.log("_onimage.beforeUpload");
                for (var i = 0, ln = images.length; i < ln; i++) {
                    Images.insert(images[i], function (err, fileObj) {
                        if (err) {
                            console.log(err);
                        } else {
                            var imagesURL = fileObj._id;
                            console.log(imagesURL);
                        }
                    });
                }
            },
            fileUploadMethod: 'PUT',
            imageUploadMethod: 'PUT',
            imageUploadParams: {id: 'my_editor'},
            imageUploadURL:'/upload_image/dsdsdf',



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