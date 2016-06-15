var hooksObject = {
    // The same as the callbacks you would normally provide when calling
    // collection.insert, collection.update, or Meteor.call
    after: {
        // Replace `formType` with the form `type` attribute to which this hook applies
        formType: function (error, result) {
            console.log("formType");
        }
    }
}

AutoForm.addHooks('pagesInsertQf', hooksObject);

