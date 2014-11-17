LauraApp = angular.module('LauraApp', ['ngRoute', 'ngResource']);

LauraApp.config(function ($routeProvider) {
  $routeProvider
    .when('/repo/:user/:repo', {
      templateUrl: 'repo.html',
      controller: 'repoController'
    })
    .when('/home', {
      templateUrl: 'home.html',
      controller: 'appController'
    })
    .otherwise({
      redirectTo: '/home'
    });
});

/*Home Controller*/
LauraApp.controller('appController', function ($scope, $http) {
  $scope.searchRepo = "";

  var onReposComplete = function (response) {
    $scope.repos = response.data;
    $scope.showLoading = 0;
    $scope.hideLoading = 1;
  }

  $scope.getRepos = function () {
    $scope.showLoading = 1;
    $scope.hideLoading = 0;
    console.log('REST API called for ' + $scope.searchRepo);
    $http.get('https://api.github.com/search/repositories?q=' + $scope.searchRepo).then(onReposComplete);
  }
});

/*Issues Controller*/
LauraApp.controller('repoController', function ($scope, $http, $routeParams) {
  $scope.user = $routeParams.user;
  $scope.repo = $routeParams.repo;
  var onIssuesComplete = function (response) {
    //console.log(response.data);
    console.log($routeParams.user);
    console.log($routeParams.repo);
    $scope.issues = response.data;
  }
  $http.get('https://api.github.com/search/issues?q=repo:' + $scope.user + '/' + $scope.repo).then(onIssuesComplete);
});