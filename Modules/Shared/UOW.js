var AppLayoutRepository = require('../Models/AppLayout/AppLayoutRepository');
var PlayerRepository = require('../Models/Player/PlayerRepository');


function UOW(callback){
    var appLayoutRepository = new AppLayoutRepository(callback);
    var playerRepository = new PlayerRepository(callback);

    return {
        AppLayoutRepository: appLayoutRepository,
        PlayerRepository: playerRepository
    }
}

module.exports = UOW;