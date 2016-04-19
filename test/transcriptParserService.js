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
    });
});