$('#display').fourd({
  width: window.innerWidth, 
  height: window.innerHeight,
  background: 0x004477
});
var fourd = $('#display').fourd('underlying_object');
var socket = io('http://localhost:16203/');

socket.on('vertex', function(data){
  var vertex = fourd.graph.add_vertex({size: 10, color: 0xffffff});
  vertex.position.set(data.vertex.position);
  vertex.id = data.vertex.id;
});

