'use strict';

angular.module('app')
    .controller('NewReceiptController', ['$scope', '$state', 'newReceiptDataService', function ($scope, $state, newReceiptDataService) {

        function initialise(){
            $scope.receipt = newReceiptDataService.newReceipt();
        }

        $scope.receiptFileChangeEventHandler = function(files){
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                $scope.receipt.file = event.target.result;
                $scope.$apply();
                $state.go('newNotes');
            };
            reader.readAsDataURL(file);
        };

        initialise();
    }]);
