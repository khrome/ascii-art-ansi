var ansi = require('./ansi')

var Canvas = function(str){
    this.data = [];
    var ob = this;
    var row = 0;
    var w = 0;
    this.height = 1;
    ansi.map(str, function(chr, styles, p, pos, shortCircuit){
        if(chr == "\n" ){
            row++;
            ob.height++;
            if(ob.width < w || !ob.width) ob.width = w;
            w=0;
        }else{
            if(!ob.data[row]) ob.data[row] = [];
            ob.data[row].push({
                chr:chr, styles:styles.slice()
            });
            w++;
        }
    }, true);
    this.height = this.data.length;
    //console.log('loaded ['+this.height+' x '+this.width+']')
    //console.log(this.data)
    //console.log(this.data.map(row => row.map(item => item.styles.length)))
}

Canvas.prototype.canvasSize = function(height, width){
    this.height = height;
    this.width = width;
}

Canvas.prototype.toString = function(){
    var result = '';
    var item;
    outer:for(var y=0; y < this.height; y++){
        for(var x=0; x < this.width; x++){
            if(!this.data[y]){
                continue outer;
            }
            item = this.data[y][x] || {chr:' '};
            result += ansi.codeRender(item.styles)+item.chr;
        }
        result += "\n";
    }
    return result;
}

Canvas.prototype.setValue = function(x, y, value){
    if(x > this.width || !this.data[y]){
        //throw new Error('set outside bounds('+x+', '+y+')['+this.height+', '+this.width+']');
        return;
    }
    this.data[y][x] = value;
}

var dimensions = function(model){
    var w = 0;
    var result = 0;
    var h = 0;
    ansi.map(model, function(c){
        if(c === "\n"){
            h++;
            if(w > result){
                result = w;
            }
            w=0;
        }else w++;
    }, true);
    return {
        height : h,
        width : result
    };
}

Canvas.prototype.drawOnto = function(str, offX, offY, isTransparent){
    if(offX < 0 || offY < 0){ //negatives for positioning from opposite margin
        var dims = dimensions(str);
        if(offX < 0) offX = this.width + offX - dims.width +1;
        if(offY < 0) offY = this.height + offY - dims.height +1;
    }
    if(!offX) offX = 0;
    if(!offY) offY = 0;
    var x = 0;
    var y = 0;
    var ob = this;
    ansi.map(str, function(chr, styles, p, pos, shortCircuit){
        if(chr == "\n" ){
            y++;
            x=0;
        }else{
            if(chr && !(isTransparent && !chr.trim())) ob.setValue(offX+x, offY+y, {
                chr:chr, styles:styles
            });
            x++;
        }
    }, true);
}

module.exports = Canvas;
