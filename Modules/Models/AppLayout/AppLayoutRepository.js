var DB = require('../../App/db'); inherits = require('util').inherits;
var AppLayout = require('./AppLayout');

function AppLayoutRepository(callback) {
    var self = this;
    DB.call(self);
    
    this.ConvertResult = function (results){
        var appLayouts = [];
        results.forEach(function (result) {
            var appLayout = new AppLayout();
            for (var property in result) {
                if (result.hasOwnProperty(property)) {
                    appLayout[property] = result[property];
                }
            }
            appLayouts.push(appLayout);
        });

        return appLayouts;
    }

    return {
        Get : function (appLayoutID) {
            self.select({
                Query: "SELECT * FROM AppLayouts where AppLayoutID = " + appLayoutID + ";", Callback: function (args) {
                    var appLayouts = self.ConvertResult(args.Results);
                    return callback({ Errors: args.Errors, AppLayouts: appLayouts });
                }
            });
        },
        ListAll : function () {
            self.select({
                Query: "SELECT * FROM AppLayouts;", Callback: function (args) {
                    var appLayouts = self.ConvertResult(args.Results);
                    return callback({ Errors: args.Errors, AppLayouts: appLayouts });
                }
            });
        }
    }
}

inherits(AppLayoutRepository, DB);

module.exports = AppLayoutRepository;


