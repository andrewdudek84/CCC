var DB = require('../../App/db'); inherits = require('util').inherits;
var Player = require('./Player');

function PlayerRepository(callback) {
    var self = this;
    DB.call(self);
    
    this.ConvertResult = function (results){
        var players = [];
        results.forEach(function (result) {
            var player = new Player();
            for (var property in result) {
                if (result.hasOwnProperty(property)) {
                    player[property] = result[property];
                }
            }
            players.push(player);
        });

        return players;
    }

    return {
        GetByMachineName : function (machineName) {
            self.select({
                Query: "SELECT * FROM Players where MachineName = '" + machineName + "';", Callback: function (args) {
                    var players = self.ConvertResult(args.Results);
                    return callback({ Errors: args.Errors,ResultType:"Players",Results: JSON.stringify(players) });
                }
            });
        }
    }
}

inherits(PlayerRepository, DB);

module.exports = PlayerRepository;


