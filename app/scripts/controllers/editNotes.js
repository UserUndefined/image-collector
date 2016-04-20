'use strict';

angular.module('app')
    .controller('EditNotesController', ['$scope', '$state', 'ReceiptApi', 'newReceiptDataService', function ($scope, $state, ReceiptApi, newReceiptDataService) {

        function initialise(){
            $scope.receipt = newReceiptDataService.getReceipt();
            $scope.showSpinner = false;
            $scope.receiptSubmitted = false;
        }

        $scope.submitReceipt = function(){
            $scope.showSpinner = true;
            var payload = {};
            payload.transcript = $scope.receipt.transcript;
            payload.receiptFile = $scope.receipt.receiptFile;
            ReceiptApi.all('receiver').post(payload).then(function(){
                $scope.receiptSubmitted = true;
                $scope.showSpinner = false;
            },function(){
                $scope.showSpinner = false;
            })
        };

        initialise();
    }]);
