var AppLayoutRepository = require('../Models/AppLayout/AppLayoutRepository');
var PlayerRepository = require('../Models/Player/PlayerRepository');
var AppSessionRepository = require('../Models/AppSession/AppSessionRepository');

function UOW(callback){
    var appLayoutRepository = new AppLayoutRepository(callback);
    var playerRepository = new PlayerRepository(callback);
    var appSessionRepository = new AppSessionRepository(callback);

    return {
        AppLayoutRepository: appLayoutRepository,
        PlayerRepository: playerRepository,
        AppSessionRepository: appSessionRepository
    }
}

module.exports = UOW;