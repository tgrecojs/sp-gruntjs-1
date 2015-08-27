var app = angular.module('app', [
    'form.config',
    'tabs.controller',
    'ui.router.config',
    'plugin.controllers',
    ])
;var form = angular.module('form.config', [])

form.factory('Users', ['$http', function($http) {
    return {
        get: function() {
            return $http.get('/api/users');
        },
        create: function(userData) {
            return $http.post('/api/users', userData);
        },
        delete: function(id) {
            return $http.delete('/api/users/' + id);
        }
    };
}]);
form.controller('MongooseController', ['$scope', '$http', 'Users', function($scope, $http, Users) {
    $scope.formData = {};

    $scope.createUser = function() {
        if ($scope.formData != undefined) {
               Users.create($scope.formData)
                  .success(function(data) {
             $scope.formData = {}; // clear the  so our user is ready to enter another
               $scope.users = data;
                $scope.myForm.$setPristine(true);
       
            });

        }
    };
}]);
;var plugin = angular.module('plugin.controllers', [])

plugin.controller('SliderController', function($scope, $timeout) {
    $scope.slides = [
        './images/skills/AI6.png',
        './images/skills/cs6.png',
        './images/skills/js-logo.png',
        './images/skills/git.png',
        './images/skills/html5x300.png',
        './images/skills/yeoman.png',
        './images/skills/nodejs350.png',
        './images/skills/Angular.png',
        './images/skills/firebase.png',
        './images/skills/grunt.png',
        './images/skills/Sass320x320.png',
        './images/skills/Bower.png'

    ];
});

plugin.controller('NavController', function($scope) {
    $(function() {
        $("#nav").tinyNav();
    });

});;angular.module('ui.router.config', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    '': {
                        templateUrl: './templates/home.html'
                    },
                    'Header@home': {
                        templateUrl: './templates/nav.html',
                        controller: 'NavController'
                    },
                    'Main-Content@home': {
                        templateUrl: './templates/main-content.html',
                        controller: 'SliderController'
                    },
                    'Footer@home': {
                        templateUrl: './templates/footer.html'
                    }
                }
            })
            .state('about', {
                url: '/this-app',
                views: {
                    '': {
                        templateUrl: './templates/about.html'
                    },
                    'Header@about': {
                        templateUrl: './templates/nav.html',
                        controller: 'NavController'
                    },

                    'Top-Content@about': {
                        templateUrl: './templates/top-content.html'
                    },
                    'Bottom-Content@about': {
                        templateUrl: './templates/bottom-content.html'
                    },
                    'Footer@about': {
                        templateUrl: './templates/footer.html'
                    }
                }
            })
            .state('contact', {
                url: '/contact',
                views: {
                    '': {
                        templateUrl: './templates/contact.html'
                    },
                    'Header@contact': {
                        templateUrl: './templates/nav.html',
                        controller: 'NavController'
                    },

                    'Contact-Form@contact': {
                        templateUrl: './templates/myForm.html',
                        controller: 'MongooseController'
                    },
                    'Footer@contact': {
                        templateUrl: './templates/footer.html'
                    }
                }
            })

        .state('skills', {
                abstract: true,
                url: '/skills',
                templateUrl: './templates/skills.html'
            })
            .state("skills.routing", {
                url: "/routing",
                templateUrl: "./templates/tabs/ui-router.html"
            })
            .state("skills.grunt", {
                url: "/grunt",
                templateUrl: "./templates/tabs/grunt.html"
            })
            .state("skills.mongodb", {
                url: "/mongodb",
                templateUrl: "./templates/tabs/mongodb.html"
            })
            .state("skills.angular", {
                url: "/angular",
                templateUrl: "./templates/tabs/angular.html"
            });


        $locationProvider.html5Mode(true).hashPrefix('!')


        //END ROUTE CONFIGURTATION
    }]);;var tabs = angular.module('tabs.controller', [])

tabs.controller("TabController", function($rootScope, $scope, $state) {        
    
    $scope.tabs = [
        { heading: "Tab 1", route:"skills.tab1", active:true },
        { heading: "Tab 2", route:"skills.tab2", active:false },
        { heading: "Tab 3", route:"skills.tab3", active:false },
        { heading: "Tab 4", route:"skills.tab4", active:false }
    ];
 
    $scope.go = function(route){
        $state.go(route);
    };
 
    $scope.active = function(route){
        return $state.is(route);
    };
 
    $scope.$on("$stateChangeSuccess", function() {
        $scope.tabs.forEach(function(tab) {
            tab.active = $scope.active(tab.route);
        });
    });
});