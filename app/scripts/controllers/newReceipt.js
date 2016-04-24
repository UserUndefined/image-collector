'use strict';

angular.module('app')
    .controller('NewReceiptController', ['$scope', '$state', 'newReceiptDataService', 'userService', function ($scope, $state, newReceiptDataService, userService) {

        function initialise(){
            $scope.receipt = newReceiptDataService.newReceipt();
        }

        $scope.receiptFileChangeEventHandler = function(files){
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                $scope.receipt.file = event.target.result;
                var user = userService.getCurrentUser();
                $scope.receipt.user = user.username;
                $scope.receipt.organisation = user.organisation;
                $scope.$apply();
                $state.go('newNotes');
            };
            reader.readAsDataURL(file);
        };

        initialise();
    }]);
