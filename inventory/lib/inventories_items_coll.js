//Define Collections
Inventories = new Mongo.Collection('inventories');
Items = new Mongo.Collection('items');

// Define the schemas
Schemas = {};
Schemas.Inventories = new SimpleSchema({
    appId: {type: String, label: "App Id", autoValue: function() {if (this.isInsert) return theAppId;}}
    ,group: {
        type: String,
        label: "Organisation Name",
        autoform: {
            afFieldInput: {
                options: function () {
                    return {
                        "techchaps": "Tech Chaps",
                        "lhs": "Leicester Hackspace",
                        "clasp": "CLASP -The Carers Centre"
                    }
                }
            }
        }
    }
    ,owner: {
        type: String,
        optional: true
    }
    ,title: {
        type: String,
        label: "Title",
        min: 0,
        optional: true
    }
    ,summary: {
        type: String,
        label: "Brief summary",
        optional: true,
        max: 1000
    }
    ,createdAt: {type: Date, label: "Created Date", autoform: {
            type: "hidden",
            label: false
        }, autoValue: function() {if (this.isInsert)return new Date;}
    ,denyUpdate: true, optional: true, autoform: { type: "hidden", label: false}}
    ,updatedAt: {type: Date, label: "Updated Date", autoValue: function() {return new Date();}, optional: true, autoform: {type: "hidden", label: false}}
    ,createdUserId: {type: String, label: "Created by", autoValue: function() {if (this.isInsert && !this.value)return this.userId;}, denyUpdate: true, optional: true, autoform: {type: "hidden", label: false}}
    ,updatedUserId: {type: String, label: "Updated by", autoValue: function() {if (!this.value)return this.userId;}, optional: true, autoform: {type: "hidden", label: false}}
});
Schemas.Items = new SimpleSchema({
    assetcode: {
        type: String,
        label: "Asset Code"
    }
    ,group: {
        type: String,
        autoform: {
            type: "hidden",
            label: false
        },
        defaultValue: 'lhs'
    }
    ,name: {
        type: String,
        label: "Name of the Item",
        min: 4,
        max: 100,
        optional: true
    }
    ,description: {
        type: String,
        label: "Description",
        optional: true,
        max: 9000
    }
    ,status: {
        type: String,
        label: "Status",
        min: 4,
        max: 100,
        optional: true,
        autoform: {
            afFieldInput: {
                options: function () {
                    return {
                        "donothack": "Use me. Don't Hack",
                        "needserpair": "Needs Repair",
                        "hackme": "Hack Me",
                        "needsmaintenance": "Use with care. Needs Maintenance",
                        "donotuse": "Do not Use, Needs Maintenance",
                        "outoforder": "Out of Order, do NOT Use",
                        "hackmeorloseme": "Hack me or Lose me. Going to recycle"
                    }
                }
            }
        },
    }
    ,publishstatus: {
        type: String,
        label: "Name of the Item",
        min: 4,
        max: 100,
        optional: true,
        autoform: {
            afFieldInput: {
                options: function () {
                    return {
                        "publish": "Publish",
                        "draft": "draft",
                        "archive": "Archived",
                        "deleted": "Deleted"
                    }
                }
            }
        },
        defaultValue: 'publish',


    }
    ,createdAt: {type: Date, label: "Created Date", autoValue: function() {if (this.isInsert)return new Date;}, denyUpdate: true, optional: true},  updatedAt: {type: Date, label: "Updated Date", autoValue: function() {return new Date();}, optional: true},  createdUserId: {type: String, label: "Created by", autoValue: function() {if (this.isInsert && !this.value)return this.userId;}, denyUpdate: true, optional: true},  updatedUserId: {type: String, label: "Updated by", autoValue: function() {if (!this.value)return this.userId;}, optional: true}
});
//Attach Schemas
Inventories.attachSchema(Schemas.Inventories);