'use strict';

angular.module('app')
    .service('newReceiptDataService', [function() {

        var _receipt = {
            file: '',
            transcript: '',
            project: '',
            price: '',
            date: ''
        };

        function resetReceipt(){
            _receipt.file = '';
            _receipt.transcript = '';
            _receipt.project = '';
            _receipt.price = '';
            _receipt.date = '';
        }

        return {
            getReceipt: function () {
                return _receipt;
            },
            newReceipt: function () {
                resetReceipt();
                return _receipt;
            }
        }

    }]);