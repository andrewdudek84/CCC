var Request = require('tedious').Request,
    Connection = require('tedious').Connection;

function DB() {
    this.ConnectionConfig = {
        userName: 'Marsden.Admin@f3do0shr3d.database.windows.net',
        password: 'Sheyher1!',
        server: 'f3do0shr3d.database.windows.net',
        options: { encrypt: true, database: 'tmg-ccc-dev',rowCollectionOnRequestCompletion:true }
    },
    this.connection;

    return {};
}

DB.prototype.open = function (callback, args){
    var self = this;
    this.connection = new Connection(this.ConnectionConfig);
    this.connection.on('connect', function (err) {
        console.log("Connected to DB");
        callback.call(self,args);
    });
}

DB.prototype.select = function (args) {
    this.open(this.request, args);
}

DB.prototype.request = function (args){
    var request = new Request(args.Query, function (err, rowCount, rows) {
        if (err) {
            console.log(err);
        } else {
            var results = [];
            rows.forEach(function (row) {
                result = {};
                row.forEach(function (column) {
                    result[column.metadata.colName] = column.value
                });
                results.push(result);
            });
            return args.Callback({ Errors: null, Results: results });
        }
    });
    
   
    request.on('done', function (rowCount, more) {
        console.log(rowCount + ' rows returned');
       
    });

    this.connection.execSql(request);
}


module.exports = DB

