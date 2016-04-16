'use strict';

angular.module('app')
    .controller('CaptureReceiptController', ['$scope', 'ReceiptApi', function ($scope, ReceiptApi) {

        function initialise(){
            $scope.transcript = '';
            $scope.receiptFile = '';
            $scope.receiptSubmitted = false;
        }

        $scope.submitReceipt = function(){
            console.info($scope.transcript);
            console.info($scope.receiptFile);
            var payload = {};
            payload.transcript = $scope.transcript;
            payload.receiptFile = $scope.receiptFile;
            ReceiptApi.all('receiver').post(payload).then(function(){
                console.log('it worked!');
                $scope.receiptSubmitted = true;
            })
        };

        $scope.startDictation = function() {

            $scope.receiptSubmitted = false;

            if (window.hasOwnProperty('webkitSpeechRecognition')) {

                var recognition = new webkitSpeechRecognition();

                recognition.continuous = false;
                recognition.interimResults = false;

                recognition.lang = "en-US";
                recognition.start();

                recognition.onresult = function(e) {
                    document.getElementById('transcript').value
                        = e.results[0][0].transcript;
                    $scope.transcript = e.results[0][0].transcript;
                    recognition.stop();
                    //document.getElementById('labnol').submit();
                };

                recognition.onerror = function(e) {
                    recognition.stop();
                }

            }
        };

        initialise();
    }]);
