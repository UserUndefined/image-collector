'use strict';

angular.module('app')
    .controller('EditNotesController', ['$scope', '$state', 'ReceiptApi', 'newReceiptDataService', function ($scope, $state, ReceiptApi, newReceiptDataService) {

        function initialise(){
            $scope.receipt = newReceiptDataService.getReceipt();
        }

        $scope.submitReceipt = function(){
            var payload = {};
            payload.transcript = $scope.receipt.transcript;
            payload.receiptFile = $scope.receipt.receiptFile;
            ReceiptApi.all('receiver').post(payload).then(function(){
                $scope.receiptSubmitted = true;
            })
        };

        initialise();
    }]);
