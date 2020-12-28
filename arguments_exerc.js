 function sum(...nums) {
     return nums.reduce((acc, el) => acc + el); 
 }


// console.log(sum(1, 2, 3, 4));
// console.log(sum(1, 2, 3, 4, 5));

function sumargs() {
   let sum = 0;

   for(let i = 0; i < arguments.length; i++){
       sum += arguments[i];
   }
   return sum
}

// console.log(sumargs(1, 2, 3, 4));
// console.log(sumargs(1, 2, 3, 4, 5));

Function.prototype.myBind = function(ctx){
    const fn = this; 
    bindArgs = Array.from(arguments).slice(1)
     
    return function(){
        callArgs = Array.from(arguments)
        return fn.apply(ctx, bindArgs.concat(callArgs));
    }
}


// Function.prototype.myBind = function(ctx, ...bindArgs){
//     const fn = this;
//     return function(...callArgs){
//         return fn.apply(ctx, bindArgs.concat(callArgs))
//     }


// }

class Cat {
    constructor(name) {
      this.name = name;
    }
  
    says(sound, person) {
      console.log(`${this.name} says ${sound} to ${person}!`);
      console.log (true);
    }
  }
  
  class Dog {
    constructor(name) {
      this.name = name;
    }
  }
  
  const markov = new Cat("Markov");
  const pavlov = new Dog("Pavlov");
  
  markov.says("meow", "Ned");
  // Markov says meow to Ned!
  // true
  
  // bind time args are "meow" and "Kush", no call time args
  markov.says.myBind(pavlov, "meow", "Kush")();
  // Pavlov says meow to Kush!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "a tree"
  markov.says.myBind(pavlov)("meow", "a tree");
  // Pavlov says meow to a tree!
  // true
  
  // bind time arg is "meow", call time arg is "Markov"
  markov.says.myBind(pavlov, "meow")("Markov");
  // Pavlov says meow to Markov!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "me"
  const notMarkovSays = markov.says.myBind(pavlov);
  notMarkovSays("meow", "me");
  // Pavlov says meow to me!
  // true

//----------------currySum---------------------

// function sumThree(num1, num2, num3) {
//   return num1 + num2 + num3;
// }

// sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
// let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
// f1 = f1(4); // [Function]
// f1 = f1(20); // [Function]
// f1 = f1(6); // = 30

// or more briefly:
// sumThree.curry(3)(4)(20)(6); // == 30

function currySum(num1){
  return function(num2){
    return function(num3){
      return num1 + num2 + num3;
    };
  };
};


//===============================

Function.prototype.curry = function(numArgs){
  const args = [];
  const fn = this;

  function _curriedFn(arg) {
    args.push(arg);

    if (args.length === numArgs) {
      return fn(...args);
    } else {
      return _curriedFn;
    }
  }

  return _curriedFn;
}