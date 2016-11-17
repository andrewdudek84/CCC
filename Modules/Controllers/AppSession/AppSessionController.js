function AppSessionController(args) {
    return {
       request: function (args){
            console.log("AppSessionController Method: " + args.Request.Method);
            if (args.Request.Method == "ValidateAppSessionByName") {
                args.UOW.AppSessionRepository.ValidateAppSessionByName(args.Request.NodeEvenRequestParameters[0].ParameterValue);
            }else{
                console.log("No Method Found: " + args.Request.Method);
            }
        }   
    }
}

module.exports = AppSessionController;