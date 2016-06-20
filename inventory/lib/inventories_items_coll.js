//Define Collections
Inventories = new Mongo.Collection('inventories');
Items = new Mongo.Collection('items');

// Define the schemas
var Schemas = {};
Schemas.Inventories = new SimpleSchema({
    group: {
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
        },
        //defaultValue: this.userId()
    },
    owner: {
        type: String,
        optional: true
    },
    title: {
        type: String,
        label: "Title",
        min: 0,
        optional: true
    },
    summary: {
        type: String,
        label: "Brief summary",
        optional: true,
        max: 1000
    }
});

//Attach Schemas
Inventories.attachSchema(Schemas.Inventories);


