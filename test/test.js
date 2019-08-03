
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['browser-request', 'dirname-shim', '../ansi', 'maplex'], function(request, shim, a){
            a.Figlet.fontPath = 'Fonts/'
            return factory(a, maplex, {
                readFile : function(filename, cb){
                    request({
                        url: filename
                    }, function(err, req, data){
                        if(err) return cb(err);
                        else cb(undefined, data);
                    })
                }
            }, should);
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('../ansi'),require('maplex'), require('fs'), require('should'));
    } else {
        throw new Error('global testing not supported!');
    }
}(this, function(ansi, maplex, fs, should){
    var isNode = typeof module === 'object' && module.exports;

    var parentDir = __dirname.split('/');
    parentDir.pop();
    parentDir = parentDir.join('/');

    describe('Ascii Art Ansi Codes', function(){
        describe('when used synchronously', function(){

            var text = 'blargh';

            it('encoding mutates the string', function(){
                var rendered = ansi.Codes(text, 'red+blink+inverse');
                rendered.should.not.equal(text); //make sure string has been altered
            });

            it('can strip a ansi string', function(){
                var rendered = ansi.Codes(text, 'red+blink+inverse');
                rendered.should.not.equal(text); //make sure string has been altered
                ansi.strip(rendered).should.equal(text);
            });

            it('substring matches built-in on text string', function(){
                var result = ansi.substring(text, 2, 4);
                result.length.should.equal(2);
                result.should.equal('ar');
            });

            it('substring matches built-in on ansi string', function(){
                var styles =
                    ansi.Codes(text.substring(0,3), 'red+blink+inverse')+
                    ansi.Codes(text.substring(3), 'blue+blink+inverse');
                var result = ansi.substring(styles, 2, 4);
                ansi.length(result).should.equal(2);
                ansi.strip(result).should.equal('ar');
            });

            it('can fetch a specific character in an ascii string', function(){
                ansi.charAt(
                    ansi.Codes(text, 'red+blink+inverse'),
                    4
                ).should.equal(text[4]);
            });

            it('can convert an ansi string to an array', function(){
                ansi.toArray(ansi.Codes(
                    text,
                    'red+blink+inverse'
                )).should.deepEqual(text.split(''));
            });

            it('length is correctly calculated', function(){
                var rendered = ansi.Codes(text, 'red+blink+inverse');
                rendered.length.should.not.equal(text.length);
                ansi.length(rendered).should.equal(text.length);
            });

            it('maps a normal string', function(){
                var rendered = 'SOMETHING';
                var values = rendered.split('');
                var lcv = 0;
                var result = ansi.map(rendered, function(chr, codes, rowcol, pos){
                    pos.should.equal(lcv);
                    chr.should.equal(values[pos]);
                    lcv++;
                    var ret = values[values.length-(pos+1)];
                    return ret;
                });
                result.should.equal(values.reverse().join(''))
                lcv.should.equal(rendered.length);
            });

            it('maps an ansi string', function(){
                var original = 'SOMETHING';
                var rendered = ansi.Codes('SOMETHING', 'red+blink+inverse');
                var values = original.split('');
                var lcv = 0;
                var result = ansi.map(rendered, function(chr, codes, rowcol, pos){
                    pos.should.equal(lcv);
                    chr.should.equal(values[pos]);
                    lcv++;
                    var ret = values[values.length-(pos+1)];
                    return ret;
                });
                result.should.equal(values.reverse().join(''))
                lcv.should.equal(original.length);
            });

            it('intersects 2 text strings', function(done){
                var a = '    THING';
                var b = 'SOME     ';
                var original = 'SOMETHING';
                ansi.intersect(a, b).then(function(intersected){
                    intersected.should.equal(original);
                    done();
                }).catch(function(err){
                    should.not.exist(err);
                });
            });

            it('intersects 2 ansi strings', function(done){
                var a = ansi.Codes('SOME     ', 'blue+blink+inverse');
                var b = ansi.Codes('    THING', 'red+blink+inverse');
                var original = 'SOMETHING';
                ansi.intersect(a, b).then(function(intersected){
                    intersected.should.equal(original);
                    done();
                }).catch(function(err){
                    should.not.exist(err);
                });
            });

            it('interstyle 2 text strings', function(done){
                var a = '    THING';
                var b = 'SOME     ';
                var original = 'SOMETHING';
                ansi.interstyle(a, b).then(function(intersected){
                    intersected.should.equal(original);
                    done();
                }).catch(function(err){
                    should.not.exist(err);
                });
            });

            it('interstyle 2 ansi strings', function(done){
                var a = ansi.Codes('SOME     ', 'blue+blink+inverse');
                var b = ansi.Codes('    THING', 'red+blink+inverse');
                var original = 'SOMETHING';
                ansi.interstyle(a, b).then(function(intersected){
                    intersected.should.not.equal(original);
                    ansi.strip(intersected).should.equal(original);
                    done();
                }).catch(function(err){
                    should.not.exist(err);
                });
            });

        });
    });


    return {};
}));
//*/
