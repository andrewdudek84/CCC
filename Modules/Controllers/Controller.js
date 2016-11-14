var AppLayoutController = require('./AppLayout/AppLayoutController');
var PlayerController = require('./Player/PlayerController');

function Controller(args){
    var controller;

    console.log(JSON.stringify(args));
    console.log("Controller: " + args.Request.BaseModel);

    switch(args.Request.BaseModel){
        case "AppLayout":
            controller = new AppLayoutController();
            break;
        case "Player":
            controller = new PlayerController();
            break;
    }

    if (controller) {
        controller.request(args);
    } 
}

module.exports = Controller;