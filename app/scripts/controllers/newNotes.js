'use strict';

angular.module('app')
    .controller('NewNotesController', ['$scope', '$state', 'transcriptParser', 'newReceiptDataService', function ($scope, $state, transcriptParser, newReceiptDataService) {

        var recognition = undefined;

        function initialise(){
            $scope.receipt = newReceiptDataService.getReceipt();
            $scope.recording = false;
            defineRecorder();
        }

        $scope.toggleDictation = function(){
            if ($scope.recording){
                recognition.stop();
            } else {
                if (recognition){
                    recognition.start();
                } else {
                    $scope.receipt.canDictate = false;
                    $state.go('editNotes');
                }
            }
        };

        function defineRecorder(){
            if (window.hasOwnProperty('webkitSpeechRecognition')) {
                recognition = new webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = "en-GB";

                recognition.onresult = function(e) {
                    var finalTranscript = "";
                    for (var i = e.resultIndex; i < e.results.length; ++i) {
                        if (e.results[i].isFinal) {
                            finalTranscript += e.results[i][0].transcript;
                        }
                    }
                    completeRecording(finalTranscript);
                };

                recognition.onerror = function(e) {
                    recognition.stop();
                    $scope.recording = false;
                    $scope.receipt.canDictate = false;
                    $scope.$apply();
                    $state.go('editNotes');
                };

                recognition.onstart = function(e){
                    $scope.recording = true;
                    $scope.$apply();
                };

                recognition.onend = function(e){
                    $scope.recording = false;
                    $scope.$apply();
                };
            }
        }

        function completeRecording(transcript){
            $scope.receipt.transcript = transcript;
            $scope.receipt.project = transcriptParser.parseProject(transcript);
            $scope.receipt.price = transcriptParser.parsePrice(transcript);
            $scope.receipt.date = moment().format("DD MMM YYYY");
            $scope.receipt.canDictate = true;
            $scope.$apply();
            $state.go('editNotes');
        }

        initialise();
    }]);
