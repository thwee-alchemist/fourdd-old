var fourddApp = angular.module('fourddApp', [])

fourddApp.controller('fourddCtrl', function fourddCtrl($scope, $http){
    $scope.graphs = [];
    $scope.vertices = [];
    $http.get('http://localhost:16203/graph/all').then(function success(r){
        console.log(r);
        $scope.graphs = r.data;
    }, console.error);
    
    var socket = io('http://localhost:16203/');
    socket.on('graph', function(graph_id){
      $scope.graphs.push({id: graph_id});
      $scope.$apply();
    });
    
    socket.on('vertex', data => {
      $scope.graphs[data.graph_id].V.push(data.vertex);
      $scope.$apply();
    });
});