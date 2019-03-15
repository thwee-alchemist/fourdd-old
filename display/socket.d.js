$('#display').fourd({
  width: window.innerWidth, 
  height: window.innerHeight,
  background: 0x004477
});
fourd = $('#display').fourd('underlying_object');
var socket = io('http://localhost:16203/');


var vertices = []

socket.on('vertex', function(options){
  var vertex = fourd.graph.add_vertex({
    id: options.vertex.id,
    cube: options.vertex.cube
  });
  vertices.push(options.vertex);
});
