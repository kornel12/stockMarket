

var app = angular.module('webapp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/login');
  
    $stateProvider

        .state('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'login'
        })
        .state('bug-report', {
          url: '/bug-report',
          templateUrl: 'views/bug-report.html',
          controller: 'bug-report'
        })
        .state('search', {
          url: '/search',
          templateUrl: 'views/search.html',
          controller: 'search'
        })
        .state('portfolio', {
          url: '/portfolio',
          templateUrl: 'views/portfolio.html',
          controller: 'portfolio'
         })
        .state('leaderboard', {
          url: '/leaderboard',
          templateUrl: 'views/leaderboard.html',
          controller: 'leaderboard'
    });

});

app.controller('login', function ($scope, $http) {
  
  $scope.submitLogin = function () {
    
    var form_val_email = true;
    var form_val_password = true;
    
    if (validate($scope.login_email, pattern_email)) {
      form_val_email = true;
       $scope.warning_login_email = "";
    } else {
      form_val_email = false;
      $scope.warning_login_email = "Bad Email Input";
    }
    
    if (validate($scope.login_password, pattern_password)) {
      form_val_password = true;
      $scope.warning_login_password = "";
    } else {
      form_val_password = false;
      $scope.warning_login_password = "Bad Password Input";
    }
    
    if (form_val_email && form_val_password) {
      var data = JSON.stringify({email: $scope.login_email, password: $scope.login_password});

      $http({
        method : 'POST',
        url : 'routes/authentication.php',
        data: data,
        headers : {'Content-Type': 'application/json'}  

      }).then(function (response) {
        log_event("Response from server", response.data);
      });
    }
    
  }
  
  $scope.submitSignup = function () {
    
    var form_val_email = true;
    var form_val_password = true;
    var form_val_username = true;
    
    if (validate($scope.signup_email, pattern_email)) {
      form_val_email = true;
       $scope.warning_signup_email = "";
    } else {
      form_val_email = false;
      $scope.warning_signup_email = "Bad Email Input";
    }
    
    if (validate($scope.signup_password, pattern_password) && $scope.signup_password == $scope.signup_duplicatepassword) {
      form_val_password = true;
      $scope.warning_signup_password = "";
    } else {
      form_val_password = false;
      $scope.warning_signup_password = "Bad Password Input";
    }
    
    if (validate($scope.signup_username, pattern_username)) {
      form_val_username = true;
      $scope.warning_signup_username = "";
    } else {
      form_val_password = false;
      $scope.warning_signup_username = "Bad Username Input";
    }
    
    if (form_val_email && form_val_password && form_val_username) {
      var data = JSON.stringify({email: $scope.signup_email, password: $scope.signup_password, username: $scope.signup_username});

      $http({
        method : 'POST',
        url : 'routes/signup.php',
        data: data,
        headers : {'Content-Type': 'application/json'}  

      }).then(function (response) {
        log_event("Response from server", response.data);
      });
    }
    
  }
  
}).controller('bug-report', function () {
  
}).controller('search', function ($scope, $http) {
  
  $scope.search_flag = false;
  
  $scope.searchStocks = function (){
    
    var url_string = $scope.stock_ticker;
    
    $http({
      method : 'GET',
      url : 'routes/find_stocks.php?ticker=' + url_string,
      headers : {'Content-Type': 'application/json'}  
    }).then(function (response) {
      log_event("Response from server", response.data);
      var stock_info = response.data;
      $scope.stocks = stock_info;
    })
    
    $scope.search_flag = true;
    
    var ctx = $("#line-chart");
    var lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1', '2', '3', '4'],
        datasets: {
          label: 'test',
          data: [4, 3, 2, 1]
        }
      }
    });
    
  }
  
  $scope.buyStocks = function (buy_qty){
    
    var data = JSON.stringify({ticker: $scope.stocks.ticker, name: $scope.stocks.name, value: $scope.stocks.value, qty: buy_qty});
    
    $http({
      method : 'POST',
      url : 'routes/buy_stock.php',
      data: data,
      headers : {'Content-Type': 'application/json'}  
    }).then(function (response) {
      log_event("Response from server", response.data);
      
    })
    
  }
  
}).controller('portfolio', function () {
  
}).controller('leaderboard', function () {
  
});

