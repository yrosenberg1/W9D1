const { prototype } = require("module");


Function.prototype.inherits = function(parent) {
    let that = this

        function Surrogate() {};
        Surrogate.prototype = parent.prototype;
        that.prototype = new Surrogate();
        that.prototype.constructor = that;
};

function MovingObject(name) { 
    this.name = name

};

function Ship(name) { 
    this.name = name
}

Ship.inherits(MovingObject);

function Asteroid(name) { 
    this.name = name
}

Asteroid.inherits(MovingObject);

MovingObject.prototype.fly = function(){
    console.log(`${this.name} is flying!!!`)
}

Asteroid.prototype.crash = function(){
    console.log(`${this.name} is crashing!!!!`)
}

Function.prototype.inherit1 = function(parent){
this.prototype = Object.create(parent.prototype)
}
