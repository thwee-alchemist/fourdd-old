var fourddApp = angular.module('fourddApp', [])

fourddApp.controller('fourddCtrl', function fourddCtrl($scope, $http){
  $scope.graphs = [];
  $scope.vertices = [];

  $http.get('http://localhost:16203/graph/all').then(function success(r){
      console.log(r);
      $scope.graphs = r.data;
  }, console.error);
  
  var socket = io('http://localhost:16203/');

  socket.on('graph_id', function(graph_id){
    $scope.graphs.push({id: graph_id, V: [], E: []});
    $scope.$apply();
  });

  
  socket.on('vertex', ({graph_id, vertex}) => {
    console.log(`${graph_id} in ${$scope.graphs}: ${graph_id in $scope.graphs}`);
    $scope.graphs.find(g => g.id == graph_id).V.push(vertex);
    $scope.$apply();
  });
});