var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = process.env.port || 3000
  , UOW = require('./Modules/Shared/UOW')
  , Controller = require('./Modules/Controllers/Controller')
  , conns =[];

app.use(function (req, res) {
  res.send({ msg: "hello" });
});

wss.on('connection', function connection(conn) {
    
    console.log('WebSocket Client Connected ('+ conns.length+'): Getting Player ID');
   var playerID = conn.upgradeReq.url.substring(1,conn.upgradeReq.url.length);
   removeDuplicatePlayers(playerID);

   console.log('PlayerID: ' + playerID);
   try {
        conn["PlayerID"] = playerID;
        conns.push(conn);

        conn.on('message', function incoming(message) {

            var request = JSON.parse(message);

            console.log("Request Type: " + request.RequestType);
           

            switch(request.RequestType){
                case "db":
                   new Controller({ UOW: new UOW(function (args) {
                        var rtnMessage = "{\"ResultType\":\"" + args.ResultType + "\",\"Results\":"+JSON.stringify(args.Results)+"}";
                        console.log("db Return: " + rtnMessage); 
                        sendMessage(rtnMessage,request.SendTo);
                    }), Request: request.NodeEventRequests[0] });
                    break;
                case "event":
                   
                    var rtnMessage = "{\"ResultType\":\"" + request.ResultType + "\",\"Results\":"+JSON.stringify(request.Results)+"}";
                     console.log("event Return: " + rtnMessage); 
                    sendMessage(rtnMessage,request.SendTo);
                    break;
            }

       
        });
    } catch (e) {
        console.log(e.message);
    }

  // you might use location.query.access_token to authenticate or share sessions
  // or conn.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  conn.on('message', function incoming(message) {
    console.log('received: %s', message);
  });


});

server.on('request', app);

server.listen(port, function () { console.log('Listening on ' + server.address().port) });

// If a Player gets discconected there old connection is still in the list, we need to remove the old connection.
function removeDuplicatePlayers(playerID){
    try{
        for (var c = 0; c < conns.length; c++) {
            if (conns[c].PlayerID == playerID) {
                conns.splice(c, 1);
            }
        }
    }catch(error){
         console.log('removeDuplicatePlayers error: ' + error.message);
    }
}

function sendMessage(message,sendTo){
    for (var c = 0; c < conns.length; c++) {
        if (conns[c].readyState == conns[c].OPEN) {
            if(sendTo === "all"){
                console.log("Broadcast: all");
                conns[c].send(message);
            }else{
                if(conns[c].PlayerID === sendTo){
                    console.log("Broadcast: " +sendTo);
                    conns[c].send(message);
                    break;
                }
            }       
        } else {
            conns.splice(c, 1);
        }
    }
}
