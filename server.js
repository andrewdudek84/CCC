var http = require('http'),
WebSocketServer = require('websocket').server,
port = process.env.port || 3000,
conn = [],
UOW = require('./Modules/Shared/UOW'),
Controller = require('./Modules/Controllers/Controller');

var server = http.createServer(function (request, response) {
    response.writeHead(404);
    response.end();
});

server.listen(port, function () {
    console.log('Node server listening on port ' + port);
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true
});

wsServer.on('close', function (request) {
});

wsServer.on('connect', function (connection) {
    console.log('WebSocket Client Connected');
    try {
        conn.push(connection);
        connection.on('message', function (req) {

            var request = JSON.parse(req.utf8Data);
            console.log("Request Type: " + request.RequestType);
            if (request.RequestType == "db") {

                new Controller({ UOW: new UOW(function (args) {
                   console.log("Return: " + JSON.stringify("{\"ResultType\":\"" + args.ResultType + "\",\"Results\":\""+JSON.stringify(args.Results)+"\"}")); 
                    for (var c = 0; c < conn.length; c++) {
                        if (!conn[c].closed) {
                            conn[c].sendUTF("{\"ResultType\":\"" + args.ResultType + "\",\"Results\":"+JSON.stringify(args.Results)+"}");
                        } else {
                            conn.splice(c, 1);
                        }
                    }
                }), Request: request.Request });

            } else {

                for (var c = 0; c < conn.length; c++) {
                    if (!conn[c].closed) {
                        conn[c].sendUTF(req.utf8Data);
                    } else {
                        conn.splice(c, 1);
                    }
                }
            }
        });
    } catch (e) {
        console.log(e.message);
    }
});

