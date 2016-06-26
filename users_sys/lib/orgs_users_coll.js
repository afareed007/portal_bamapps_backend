//schema
Orgs = new Mongo.Collection('orgs');
Orgs.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: 'Title',
        max: 200,
        unique: true
    },
    initials: {
        type: String,
        label: "Content",
        min: 3,
        max: 5,
        unique: true
    }
}));
Orgs.helpers({
    usersInOrgs() {
        //return ; //TODO return users in orgs to users
    }
});


Schema = {};
Schema.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organization : {
        type: String,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    country: {
        type: Schema.UserCountry,
        optional: true
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    //todo: add and test  splendido:meteor-accounts-meld along with uncommenting below code + any config required.
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    //registered_emails: {
    //    type: [Object],
    //    optional: true,
    //    blackbox: true
    //},
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    //// Add `roles` to your schema if you use the meteor-roles package.
    //// Option 1: Object type
    //// If you specify that type as Object, you must also specify the
    //// `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    //// Example:
    //// Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    //// You can't mix and match adding with and without a group since
    //// you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    //// Option 2: [String] type
    //// If you are sure you will never need to use role groups, then
    //// you can specify [String] as the type
    //roles: {
    //    type: [String],
    //    optional: true
    //},

    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(Schema.User);