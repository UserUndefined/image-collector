'use strict';

angular.module('app')
    .service('transcriptParser', [function() {

        function extractProject(transcript){

            var transcriptCopy = new String(transcript);
            transcriptCopy = transcriptCopy.toLowerCase();

            var projectIndex = getTagValueStartIndex(transcriptCopy, 'project');

            if (projectIndex < 0){
                return '';
            }
            var projectName = transcript.substring(projectIndex, transcript.length);
            return projectName;
        }

        function getTagValueStartIndex(transcript, tag){
            var tagIndex = transcript.indexOf(tag);
            if (tagIndex < 0){
                return -1;
            }
            //tag value will be at the tag end plus one space from the tag start index
            tagIndex = tagIndex + tag.length + 1;
            //compare to length of the transcript (not zero based) and if the same length then there is no value
            if (tagIndex >= transcript.length){
                return -1;
            }
            return tagIndex;
        }

        return {

            parseProject: function (transcript) {
                var project = extractProject(transcript);
                return project;
            }
        }

    }]);