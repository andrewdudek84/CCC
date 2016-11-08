﻿function AppLayoutController(args) {
    return {
       request: function (args){
            console.log("AppLayoutController Method: " + args.Request.Method);
            if (args.Request.Method == "Get") {
                args.UOW.AppLayoutRepository.Get(args.Request.Params[0].AppLayoutID);
            }
            else if (args.Request.Method == "ListAll") {
                args.UOW.AppLayoutRepository.ListAll();
            }
        }   
    }
}

module.exports = AppLayoutController;