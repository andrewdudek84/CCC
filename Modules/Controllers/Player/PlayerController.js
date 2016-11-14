function PlayerController(args) {
    return {
       request: function (args){
            console.log("PlayerController Method: " + args.Request.Method);
            if (args.Request.Method == "GetByMachineName") {
                args.UOW.PlayerRepository.GetByMachineName(args.Request.NodeEvenRequestParameters[0].ParameterValue);
            }else{
                console.log("No Method Found: " + args.Request.Method);
            }
        }   
    }
}

module.exports = PlayerController;