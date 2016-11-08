var AppLayoutController = require('./AppLayout/AppLayoutController');

function Controller(args){
    var controller;
    if (args.RequestConfig.BaseModel == "AppLayout") {
        controller = new AppLayoutController();
    }

    if (controller) {
        controller.request(args);
    } 
}

module.exports = Controller;