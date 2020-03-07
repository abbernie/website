console.log("helllooooo");

function CA(rules){
        
        this.generation;
        this.rules = rules;
        this.w = 10;
        this.cells = new Array(window.innerWidth/this.w);
        this.restart();
        this.ctx = ctx;
        this.actx = actx;

}

CA.prototype.setRules = function(rules){
    this.rules = rules;
}

CA.prototype.randomize = function(){
	for(var i = 0; i < 8; i++){
		this.rules[i] = Math.floor(Math.random());
	}
}

CA.prototype.restart = function(){
	for(var i = 0;i < this.cells.length; i++){
		this.cells[i] = 0;
	}
	this.cells[this.cells.length/2] = 1;
	this.generation = 0;
}

CA.prototype.generate = function(){
	var nextgen = new Array(this.cells.length);

	for(var i = 1; i < this.cells.length-1; i++){
		var left = this.cells[i-1];
		var me = this.cells[i];
		var right = this.cells[i+1];
		nextgen[i] = this.executeRules(left,me,right);
	}

	for(var i = 1; i < this.cells.legnth-1; i++){
		this.cells[i] = nextgen[i];
	}

	generation++;
}

CA.prototype.render = function(){
	for(var i = 0; i < this.cells.length; i++){
		if(this.cells[i] == 1){
			fill(255);
		}else {
			fill(0);
		}
		rect(i*this.w,this.generation*this.w,this.w,this.w);

	}
}

CA.prototype.executeRules = function(a, b, c){
    if (a == 1 && b == 1 && c == 1) { return this.rules[0]; }
    if (a == 1 && b == 1 && c == 0) { return this.rules[1]; }
    if (a == 1 && b == 0 && c == 1) { return this.rules[2]; }
    if (a == 1 && b == 0 && c == 0) { return this.rules[3]; }
    if (a == 0 && b == 1 && c == 1) { return this.rules[4]; }
    if (a == 0 && b == 1 && c == 0) { return this.rules[5]; }
    if (a == 0 && b == 0 && c == 1) { return this.rules[6]; }
    if (a == 0 && b == 0 && c == 0) { return this.rules[7]; }
    return 0;
  
}
