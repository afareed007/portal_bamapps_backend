Picker.route( '/upload_image/:link', function( params, request, response, next ) {
    // Handle our request and response here.

    console.log("params:");
    //console.log(params);
    var data = {
        params: params,
        query: params.query,
        body: request.body
    };
    console.log(request);


    response.setHeader( 'Content-Type', 'application/json' );
    response.statusCode = 200;

    var link = '/cfs/files/images/6ZSD6zf9xxdCcRmL6';
    var json = JSON.stringify({
        link: link
    });
    response.end(json);

});