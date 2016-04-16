'use strict';

angular.module('app')
    .controller('CaptureReceiptController', ['$scope', 'ReceiptApi', function ($scope, ReceiptApi) {

        function initialise(){
            $scope.transcript = '';
        }

        $scope.submitReceipt = function(){
            console.info($scope.transcript);
            var payload = {};
            payload.transcript = $scope.transcript;
            ReceiptApi.all('receiver').post(payload).then(function(){
                console.log('it worked!');
            })
        };

        initialise();
    }]);
