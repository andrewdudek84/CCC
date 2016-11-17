var DB = require('../../App/db'); inherits = require('util').inherits;
var AppSession = require('./AppSession');

function AppSessionRepository(callback) {
    var self = this;
    DB.call(self);
    
    this.ConvertResult = function (results){
        var appSessions = [];
        results.forEach(function (result) {
            var appSession = new AppSession();
            for (var property in result) {
                if (result.hasOwnProperty(property)) {
                    appSession[property] = result[property];
                }
            }
            appSessions.push(appSession);
        });

        return appSessions;
    }

    return {
        ValidateAppSessionByName : function (appSessionID) {
            self.select({
                Query: "SELECT * FROM AppSessions where AppSessionName = '" + appSessionID + "';", Callback: function (args) {
                    var appSessions = self.ConvertResult(args.Results);
                    var id="";
                    if(appSessions.length>0){
                        id = appSessions[0].AppSessionID;
                    }
                    return callback({ Errors: args.Errors,ResultType:"AppSessionID",Results: id });
                }
            });
        }
    }
}

inherits(AppSessionRepository, DB);

module.exports = AppSessionRepository;


