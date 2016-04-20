'use strict';

angular.module('app')
    .controller('CaptureReceiptController', ['$scope', 'ReceiptApi', 'transcriptParser', function ($scope, ReceiptApi, transcriptParser) {

        function initialise(){
            $scope.transcript = '';
            $scope.receiptFile = '';
            $scope.createdDate = '';
            $scope.project = '';
            $scope.claimValue = '';
            $scope.receiptSubmitted = false;
            $scope.receiptInvalid = true;
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
                    $scope.project = transcriptParser.parseProject(e.results[0][0].transcript);
                    $scope.$apply();
                    recognition.stop();
                    //document.getElementById('labnol').submit();
                };

                recognition.onerror = function(e) {
                    recognition.stop();
                }
                recognition.onstart = function(event){
                    //console.log('Dictation started');
                }

                recognition.onend = function(){
                    //console.log('Dictation ended');
                }
            }
        };

        $scope.receiptFileChangeEventHandler = function(files){
            console.log('event handles');
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                $scope.receiptFile = event.target.result;
                $scope.receiptInvalid = false;
                $scope.$apply();
            };
            reader.readAsDataURL(file);
        };

        initialise();
    }]);
