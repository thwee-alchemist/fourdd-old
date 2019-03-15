
/*var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = 16203;
var io = require('socket.io').listen(http);
*/
var port = 16203;
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var uuidv4 = require('uuid/v4');

app.use('/', express.static('node_modules/socket.io-client/dist'))
app.use('/', express.static('node_modules/bootstrap'));
app.use('/', express.static('node_modules/angular'));
app.use('/display', express.static('display'));
app.use('/dashboard', express.static('dashboard'));

graphs = [];
nsps = [];

app.get('/graph/all', (req, res) => {
  res.send(JSON.stringify(graphs.map(c => c.g)));
})

app.get('/graph/create', (req, res) => {
  var id = uuidv4();
  res.send(JSON.stringify({'graph_id': id}));
  graphs.push({g: {id: id, V: [], E: []}, io: io.of(`/${id}`)});
  io.sockets.emit('graph', id);
});

app.get('/graph/:id', (req, res) => {
  res.send(JSON.stringify({'graph': graphs.find(c => c.g.id == req.params.id)}).g);
});

app.get('/graph/:id/vertex/all', (req,res) => {
  res.send(JSON.stringify({'vertices': graphs.find(c => c.g.id == req.params.id).g.V}));
});

app.get('/graph/:id/vertex/create', (req, res) => {
  var graph_id = req.params.id;
  var vertex_id = uuidv4();
  var vertex = {id: vertex_id, position: {x: Math.random(), y: Math.random(), z: Math.random()}}
  var graph = graphs.find(c => c.g.id == graph_id);
  
  graph.g.V.push(vertex);
  io.sockets.emit('vertex', {'graph_id': graph_id, 'vertex': vertex});
  res.send(JSON.stringify(vertex));
});

app.get('/graph/:graph/vertex/:vertex', (req, res) => {
  var graph = graphs.find(c => c.g.id == req.params.graph).g;
  var vertex = graph.V.find(v => v.id == req.params.vertex);
  res.send(JSON.stringify(vertex));
});

io.on('connection', (socket) => {
  socket.emit('hello');
});

server.listen(port, () => console.log(`Listening on ${port}`));
console.log('');






