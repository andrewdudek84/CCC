var AppLayoutController = require('./AppLayout/AppLayoutController');

function Controller(args){
    var controller;
    console.log("Controller: " + args.Request.BaseModel);
    if (args.Request.BaseModel == "AppLayout") {
        controller = new AppLayoutController();
    }

    if (controller) {
        controller.request(args);
    } 
}

module.exports = Controller;