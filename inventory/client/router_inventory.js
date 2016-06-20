FlowRouter.route('/itemslist', {
    subscriptions: function() {
        this.register('pages', Meteor.subscribe('pages'));
    },
    action: function(params, queryParams) {
        BlazeLayout.render("layout1", {left: "sideBarInventory", top: "header", main: "itemslist", footer:"footer"});
    }
});

FlowRouter.route('/createitem', {
    subscriptions: function() {
        this.register('pages', Meteor.subscribe('pages'));
    },
    action: function(params, queryParams) {
        BlazeLayout.render("layout1", {left: "sideBarInventory", top: "header", main: "createitem", footer:"footer"});
    }
});