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
        connection.on('message', function (mg) {

            if (mg.utf8Data.substring(0, 3) == "db:") {


                var requestConfig = {
                    BaseModel: "AppLayout",
                    Request: "Get",
                    Params: [{ AppLayoutID : "1"}]
                };


                var uow = new UOW(function (args) {
                    for (var c = 0; c < conn.length; c++) {
                        if (!conn[c].closed) {
                            conn[c].sendUTF("{\"data\":[{\"machine\":\"drewd\",\"position\":\"1\"},{\"machine\":\"alien1\",\"position\":\"2\"}]}");
                        } else {
                            conn.splice(c, 1);
                        }
                    }
                });

                var controller = new Controller({ UOW: uow, RequestConfig: requestConfig });


            } else {

                for (var c = 0; c < conn.length; c++) {
                    if (!conn[c].closed) {
                        conn[c].sendUTF(mg.utf8Data);
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

