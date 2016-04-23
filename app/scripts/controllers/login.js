'use strict';

angular.module('app')
    .controller('LoginController', ['$scope', 'notify', '$state', 'userService', 'ReceiptApi', function ($scope, notify, $state, userService, ReceiptApi) {

        function initialise(){
            if (userService.isLoggedIn()){
                $state.transitionTo('newReceipt');
            }

            $scope.user = {
                organisation: 'Test Company',
                logon: 'Guest',
                password: 'password',
                rememberMe: true
            };
        }

        $scope.submitLogon = function(){
            if (!$scope.loginForm.$invalid) {
                /*
                ReceiptApi.all('session').post($scope.user).then(function (res) {
                    // Successful login
                    userService.logIn($scope.values.username, res.access_token, res.role, res.campaign);
                    $state.transitionTo('newReceipt');
                }, function () {
                    // Unsuccessful Login
                    notify({ message:'Login Failed', duration:3000, classes:'alert-fail'} );
                });
                */
                if ($scope.user.logon === 'Guest' && $scope.user.password === 'password') {
                    // Successful login
                    userService.logIn($scope.user.logon, 'ABCDE12345', $scope.user.organisation);
                    $state.transitionTo('newReceipt');
                } else {
                    // Unsuccessful Login
                    notify({ message:'Login Failed', duration:3000, classes:'alert-fail'} );
                }
            }
        };

        initialise();
    }]);
