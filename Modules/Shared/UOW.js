var AppLayoutRepository = require('../Models/AppLayout/AppLayoutRepository');

function UOW(callback){
    var appLayoutRepository = new AppLayoutRepository(callback);

    return {
        AppLayoutRepository: appLayoutRepository
    }
}

module.exports = UOW;