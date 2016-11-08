function AppLayoutController(args) {
    return {
       request: function (args){
            if (args.RequestConfig.Request == "Get") {
                args.UOW.AppLayoutRepository.Get(args.RequestConfig.Params[0].AppLayoutID);
            }
            else if (args.RequestConfig.Request == "ListAll") {
                args.UOW.AppLayoutRepository.ListAll();
            }
        }   
    }
}

module.exports = AppLayoutController;