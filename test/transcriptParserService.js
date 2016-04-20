describe('TestTranscriptParser', function() {
    beforeEach(module('app'));

    var $injector;

    beforeEach(inject(function(_$injector_){
        $injector = _$injector_.get('transcriptParser');
    }));

    describe('parseProject parses project values correctly', function() {
        it('parse ""', function () {
            var result = $injector.parseProject('');
            expect(result).toEqual('');
        });
        it('parse "Project X"', function () {
            var result = $injector.parseProject('Project X');
            expect(result).toEqual('X');
        });
        it('parse "Project "', function () {
            var result = $injector.parseProject('Project ');
            expect(result).toEqual('');
        });
        it('parse "Project"', function () {
            var result = $injector.parseProject('Project');
            expect(result).toEqual('');
        });
        it('parse "Project super web storm"', function () {
            var result = $injector.parseProject('Project super web storm');
            expect(result).toEqual('super web storm');
        });
        it('parse "Price £3.80 Project super web storm"', function () {
            var result = $injector.parseProject('Price £3.80 Project super web storm');
            expect(result).toEqual('super web storm');
        });
        it('parse "Project super web storm Price £3.80"', function () {
            var result = $injector.parseProject('Project super web storm Price £3.80');
            expect(result).toEqual('super web storm ');
        });
        it('parse "Project X Project Y"', function () {
            var result = $injector.parseProject('Project X Project Y');
            expect(result).toEqual('X ');
        });
    });

    describe('parsePrice parses price values correctly', function() {
        it('parse ""', function () {
            var result = $injector.parsePrice('');
            expect(result).toEqual('');
        });
        it('parse "Price £13.57"', function () {
            var result = $injector.parsePrice('Price £13.57');
            expect(result).toEqual('£13.57');
        });
        it('parse "Price "', function () {
            var result = $injector.parsePrice('Price ');
            expect(result).toEqual('');
        });
        it('parse "Price"', function () {
            var result = $injector.parsePrice('Price');
            expect(result).toEqual('');
        });
        it('parse "Price £13.57 yarda yarda"', function () {
            var result = $injector.parsePrice('Price £13.57 yarda yarda');
            expect(result).toEqual('£13.57');
        });
        it('parse "Price £3.80 Project super web storm"', function () {
            var result = $injector.parsePrice('Price £3.80 Project super web storm');
            expect(result).toEqual('£3.80');
        });
        it('parse "Project super web storm Price £3.80"', function () {
            var result = $injector.parsePrice('Project super web storm Price £3.80');
            expect(result).toEqual('£3.80');
        });
        it('parse "Price £4.00 Price £5.00"', function () {
            var result = $injector.parsePrice('Price £4.00 Price £5.00');
            expect(result).toEqual('£4.00');
        });
    });
});