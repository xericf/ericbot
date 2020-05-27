var Promise = require("promise");

function Blackjack(){ // maybe make it so that each individual have their own count
  this.count = 0;


  this.cards = ["1", '2', '3', '4', '5', '6', '7', '8', '9', '10', "j", "q", "k", "a"];
  this.countValue = [-1, 1, 1, 1, 1, 1, 0, 0, 0, -1, -1, -1 , -1, -1];

  this.countCards = function(args, callback){
      //TODO: return error on not allowed characters


      var c = 0;

      for(let i = 0 ; i < args.length; i++){
        var value = this.countValue[this.cards.indexOf(args[i])]
        if(value) c += value;
        if(i >= args.length-1) {
          this.count +=c;
          callback(null, c);
          return;
        }
      }
  }
  this.setRunningCount = function(val){
    this.count = val;
  }

  this.getRunningCount = function(){
    return this.count;
  }
}

var bj = new Blackjack();

module.exports = bj;
