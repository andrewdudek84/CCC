function PlayerController(args) {
    return {
       request: function (args){
            console.log("PlayerController Method: " + args.Request.Method);
            if (args.Request.Method == "GetByMachineName") {
                args.UOW.PlayerRepository.GetByMachineName(args.Request.Params[0].MachineName);
            }else{
                console.log("No Method Found: " + args.Request.Method);
            }
        }   
    }
}

module.exports = PlayerController;