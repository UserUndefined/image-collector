'use strict';

angular.module('app')
    .controller('NewNotesController', ['$scope', '$state', 'transcriptParser', 'newReceiptDataService', function ($scope, $state, transcriptParser, newReceiptDataService) {

        function initialise(){
            $scope.receipt = newReceiptDataService.getReceipt();
        }

        $scope.startDictation = function() {

            if (window.hasOwnProperty('webkitSpeechRecognition')) {

                var recognition = new webkitSpeechRecognition();

                recognition.continuous = false;
                recognition.interimResults = false;

                recognition.lang = "en-US";
                recognition.start();

                recognition.onresult = function(e) {
                    $scope.receipt.transcript = e.results[0][0].transcript;
                    $scope.receipt.project = transcriptParser.parseProject(e.results[0][0].transcript);
x                    $scope.receipt.price = transcriptParser.parsePrice(e.results[0][0].transcript);
                    $scope.$apply();
                    recognition.stop();
                    $state.go('editNotes');
                };

                recognition.onerror = function(e) {
                    recognition.stop();
                };

                recognition.onstart = function(event){
                    //console.log('Dictation started');
                };

                recognition.onend = function(){
                    //console.log('Dictation ended');
                };
            }
        };

        initialise();
    }]);
