'use strict';

angular.module('app')
    .controller('EditNotesController', ['$scope', '$state', 'ReceiptApi', 'newReceiptDataService', 'notify', 'transcriptParser', function ($scope, $state, ReceiptApi, newReceiptDataService, notify, transcriptParser) {

        function initialise(){
            $scope.receipt = newReceiptDataService.getReceipt();
            $scope.showSpinner = false;
            $scope.receiptSubmitted = false;
            $scope.isTranscriptFocused = !$scope.receipt.canDictate;
            $scope.parseTranscript();
        }

        $scope.parseTranscript = function(){
            if ($scope.receipt.project === ''){
                $scope.receipt.project = transcriptParser.parseProject($scope.receipt.transcript);
            }
            if ($scope.receipt.price === ''){
                $scope.receipt.price = transcriptParser.parsePrice($scope.receipt.transcript);
            }
        }

        $scope.submitReceipt = function(){
            $scope.showSpinner = true;
            var payload = {};
            payload.project = $scope.receipt.project;
            payload.price = $scope.receipt.price;
            payload.date = $scope.receipt.date;
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
        };

        initialise();
    }]);
