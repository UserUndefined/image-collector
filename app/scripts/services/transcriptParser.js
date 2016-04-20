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

            var projectName = transcript.substring(projectIndex, getTagValueEndIndex(transcriptCopy, projectIndex, true));
            return projectName;
        }

        function extractPrice(transcript){

            var transcriptCopy = new String(transcript);
            transcriptCopy = transcriptCopy.toLowerCase();

            var priceIndex = getTagValueStartIndex(transcriptCopy, 'price');

            if (priceIndex < 0){
                return '';
            }

            var priceValue = transcript.substring(priceIndex, getTagValueEndIndex(transcriptCopy, priceIndex));
            return priceValue;
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

        function getTagValueEndIndex(transcript, startIndex, includeSpaces){
            var possibleTagValueEndIndexes = [];

            //add the transcript end index to our array of possible end indexes
            possibleTagValueEndIndexes.push(transcript.length);

            if (!includeSpaces){
                var nextSpaceIndex = transcript.indexOf(' ',startIndex);
                if (nextSpaceIndex > -1){
                    possibleTagValueEndIndexes.push(nextSpaceIndex);
                }
            }

            //search to see if there are any further "project" tags. If so, we'll end the tag value there
            var nextProjectTagIndex = transcript.indexOf('project',startIndex);
            if (nextProjectTagIndex > -1){
                possibleTagValueEndIndexes.push(nextProjectTagIndex);
            }

            //search to see if there are any further "price" tags. If so, we'll end the tag value there
            var nextPriceTagIndex = transcript.indexOf('price',startIndex);
            if (nextPriceTagIndex > -1){
                possibleTagValueEndIndexes.push(nextPriceTagIndex);
            }

            //the tag value end index is the lowest value within our possibles array
            return Math.min.apply(Math, possibleTagValueEndIndexes);
        }

        return {

            parseProject: function (transcript) {
                var project = extractProject(transcript);
                return project;
            },
            parsePrice: function (transcript) {
                var project = extractPrice(transcript);
                return project;
            }
        }

    }]);