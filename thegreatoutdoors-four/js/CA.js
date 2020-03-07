function CA(rules, actx){
        
        this.generation;
        this.rules = rules;
        this.w = 7;
        this.cells = new Array(Math.floor(window.innerWidth/this.w));
        this.restart();
        // this.ctx = ctx;
        this.actx = actx;
        console.log("cells", this.cells.length);
        console.log("ruleset", this.rules);
        this.osc = [];
        this.gain = [];
        this.notes = [60,48,67,74,72,65,58,62];
        this.init();


}

CA.prototype.init = function(){
	for(var i = 0; i < 8; i++){
		this.osc[i] = this.actx.createOscillator();
		this.gain[i] = this.actx.createGain();
		this.osc[i].type = 'triangle';
		this.osc[i].frequency.value = tune.note(this.notes[i]);
		this.osc[i].connect(this.gain[i]);
		this.gain[i].connect(this.actx.destination);
		this.osc[i].start();

		console.log(this.notes[i]);
	}
}

CA.prototype.env = function(source){
	source.gain.linearRampToValueAtTime(Math.random(), actx.currentTime+2);
	source.gain.linearRampToValueAtTime(0, actx.currentTime+(Math.floor(Math.random()*50)));
}

CA.prototype.setRules = function(rules){
    this.rules = rules;
}

CA.prototype.randomize = function(){
	for(var i = 0; i < 8; i++){
		this.rules[i] = Math.floor(Math.random()*2);
	}
}

CA.prototype.restart = function(){
	for(var i = 0;i < this.cells.length; i++){
		this.cells[i] = 0;
		// if(i%3 == 0){
		// 	this.cells[i] = 1;
		// }
	}
	this.cells[this.cells.length/3] = 1;
	this.generation = 0;
}

CA.prototype.generate = function(){
	var nextgen = new Array(this.cells.length);
	//console.log(cells[1]);
	for(var i = 1; i < this.cells.length-1; i++){
		var a = this.cells[i-1];
		var b = this.cells[i];
		var c = this.cells[i+1];
		//nextgen[i] = this.executeRules(left,me,right);
		//console.log("me",me);
		if (a == 1 && b == 1 && c == 1) {  
			nextgen[i] = this.rules[0]; 
			this.env(this.gain[0]);
		}
    	if (a == 1 && b == 1 && c == 0) {  
    		nextgen[i] = this.rules[1];
    		this.env(this.gain[1]); 
    	}
    	if (a == 1 && b == 0 && c == 1) {  
    		nextgen[i] = this.rules[2]; 
    		this.env(this.gain[2]);
    		} //
    	if (a == 1 && b == 0 && c == 0) {  
    		nextgen[i] = this.rules[3]; 
    		this.env(this.gain[3]);
    	}
    	if (a == 0 && b == 1 && c == 1) {  
    		nextgen[i] = this.rules[4]; 
    		this.env(this.gain[4]);
    	}
    	if (a == 0 && b == 1 && c == 0) {  
    		nextgen[i] = this.rules[5]; 
    		this.env(this.gain[5]);
    		} //
    	if (a == 0 && b == 0 && c == 1) {  
    		nextgen[i] = this.rules[6];
    		this.env(this.gain[6]); 
    	}
    	if (a == 0 && b == 0 && c == 0) {  
    		nextgen[i] = this.rules[7]; 
    		this.env(this.gain[7]);
    	}

	}

	for(var i = 1; i < this.cells.length-1; i++){
		this.cells[i] = nextgen[i];
	}
	

	this.generation++;
}

CA.prototype.render = function(){
	for(var i = 0; i < this.cells.length; i++){
		if(this.cells[i] == 1){
			fill(255,Math.floor(Math.random()*64),255);
		}else {
			fill(0);
		}
		noStroke();
		rect(i*this.w,this.generation*this.w,this.w,this.w);

	}
}

CA.prototype.finished = function(){
	if(this.generation > window.innerHeight/this.w){
		return true;
	} else {
		return false;
	}
}
