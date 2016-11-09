var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = process.env.port || 3000
  , UOW = require('./Modules/Shared/UOW')
  , Controller = require('./Modules/Controllers/Controller')
  , conn =[];

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

wss.on('connection', function connection(ws) {
   var playerID = ws.upgradeReq.url.substring(1,ws.upgradeReq.url.length);

   console.log('WebSocket Client Connected: ' + playerID);
    try {
        ws["PlayerID"] = playerID;
        conn.push(ws);

        ws.on('message', function incoming(message) {

            var request = JSON.parse(message);

            console.log("Request Type: " + request.RequestType);
           

            switch(request.RequestType){
                case "db":
                   new Controller({ UOW: new UOW(function (args) {
                
                        console.log("Return: " + JSON.stringify("{\"ResultType\":\"" + args.ResultType + "\",\"Results\":\""+JSON.stringify(args.Results)+"\"}")); 

                        var rtnMessage = "{\"ResultType\":\"" + args.ResultType + "\",\"Results\":"+JSON.stringify(args.Results)+"}";
                   
                        sendMessage(rtnMessage,request.Broadcast === "all",request.Broadcast);
                 
                    }), Request: request.Request });
                    break;
                case "event":
                    sendMessage(rtnMessage,request.Broadcast === "all",request.Broadcast);
                    break;
                
            }

       
        });
    } catch (e) {
        console.log(e.message);
    }

  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

});

server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });


function sendMessage(message,broadcast,to){
    for (var c = 0; c < conn.length; c++) {
        if (!conn[c].closed) {
            if(broadcast){
                console.log("Broadcast: all");
                conn[c].send(message);
            }else{
                if(conn[c].PlayerID === to){
                    console.log("Broadcast: " + to);
                    conn[c].send(message);
                    break;
                }
            }       
        } else {
            conn.splice(c, 1);
        }
    }
}
