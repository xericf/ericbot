var blackjack = require("./blackjack.js");
function Speech() {
  var t = this;

// ___HELP___

  this.invalidCommand = function(){
      return { embed: {
        color: Math.random() * 16777216,
        description: "Sorry, Invalid Command."
      }};
  };

  // ___CURRENCY___
  this.balance = function(data){
    return { embed: {
      color: Math.random() * 16777216,
      description: "The balance of "+ data[0] + " is: " + data[1]
    }};
  }

  this.share = function(data){ // [b0ssbux, person]
    return {
      embed: {
        color: Math.random() * 16777216,
        description: "Successfully paid " + data[0] +" B0ssBux to "+ data[1]
      }
    }
  }
  this.shareFail = function(data){
    return {
      embed:{
        color: Math.random() * 16777216,
        description: "Who are you paying B0ssBux to?!?"
      }
    }
  }

  // ___AUDIO___

  this.listFiles = function(data){
    return { embed: {
      color: Math.random() * 16777216,
      description: data.toString()
    }};
  }

  //___ENGLISH___

  this.unsramble = function(data){
    return { embed: {
      color: Math.random() * 16777216,
      description: data.toString()
    }};
  }

  //___CARDS___

  this.countCards = function(data){
    return { embed: {
      color: Math.random() * 16777216,
      description: "The count of said cards is: " + data
    }};
  }
  this.runningCount = function(){
    return { embed: {
      color: Math.random() * 16777216,
      description: "The running count is: " + blackjack.getRunningCount()
    }};
  }
  this.resetCount = function(){
    return { embed: {
      color: Math.random() * 16777216,
      description: "resetted count"
    }};
  }




}

var s = new Speech();

module.exports = s;
