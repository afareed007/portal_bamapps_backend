Meteor.methods({
    "insertImagesFroalaPages": function (request) {

        // Make sure the user is logged in before inserting a task
        //if (!Meteor.userId()) {
        //    throw new Meteor.Error("not-authorized");
        //}
        //console.log('insertImagesFroalaPages');

        //Images.insert(theimage, function (err, fileObj) {
        //    if (err) {
        //        //console.log(err);
        //        return "insertImagesFroalaPages, ERROR: ";
        //    } else {
        //        var imagesURL = {"profile.image": "/cfs/files/images/" + fileObj._id};
        //        //console.log("image uploaded: "+ imagesURL);
        //        //console.log(imagesURL);
        //        return "imagesURL";
        //    }
        //});
        console.log(request.file);

        return "insertImagesFroalaPages 1111 "+request.file;
            //+ content
    }
});

//Meteor.method("insertImagesFroalaPages", function (theimage) {
//    return "sdsfds";
//}, {
//    url: "insertImagesFroalaPages",
//    getArgsFromRequest: function (request) {
//        // Let's say we want this function to accept a form-encoded request with
//        // fields named `a` and `b`.
//        var content = request.body;
//
//        // Since form enconding doesn't distinguish numbers and strings, we need
//        // to parse it manually
//        return [ parseInt(content.theimage, 10) ];
//    }
//})