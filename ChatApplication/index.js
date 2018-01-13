var express = require("express");
var jade = require("jade");
var app = express();

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

var port = 3700;

app.get("/", function (req, res) {
    res.render("page");
});


var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port" + port);

io.sockets.on('connection', function (socket) {
    debugger;
    socket.emit('message', {
        message: 'welcome to the chat'
    });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});