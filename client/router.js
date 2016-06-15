FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("layout1", {top: "header", main: "page-front"});
    }
});
FlowRouter.route('/web/:page', {
    subscriptions: function() {
        this.register('pages', Meteor.subscribe('pages'));
    },
    action: function(params, queryParams) {
        var pageName = 'web'+params.page;
        console.log("Yeah! We are on the /:"+ pageName);
        BlazeLayout.render("layout1", {top: "header", main: pageName, pagesList: "createNew"});
    }
});

