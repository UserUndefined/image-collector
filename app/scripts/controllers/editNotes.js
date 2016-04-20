'use strict';

angular.module('app')
    .controller('EditNotesController', ['$scope', '$state', 'ReceiptApi', 'newReceiptDataService', 'notify', function ($scope, $state, ReceiptApi, newReceiptDataService, notify) {

        function initialise(){
            $scope.receipt = newReceiptDataService.getReceipt();
            $scope.showSpinner = false;
            $scope.receiptSubmitted = false;
        }

        $scope.submitReceipt = function(){
            $scope.showSpinner = true;
            var payload = {};
            payload.project = $scope.receipt.project;
            payload.price = $scope.receipt.price;
            payload.transcript = $scope.receipt.transcript;
            payload.file = $scope.receipt.file;
            ReceiptApi.all('receiver').post(payload).then(function(){
                $scope.receiptSubmitted = true;
                $scope.showSpinner = false;
                notify({ message:'Receipt Saved', duration:3000, classes:'alert-success'} );
            },function(){
                $scope.showSpinner = false;
            })
        };

        $scope.navigateToNewReceipt = function(){
            $state.go('newReceipt');
        }

        initialise();
    }]);
