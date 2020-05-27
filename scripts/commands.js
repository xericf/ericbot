var blackjack = require("./blackjack.js");
var english = require("./english.js");
var audio = require("./audio.js");
var currency = require("./currency.js");
var speech = require("./speech.js");

var opus = require('opusscript');



function Commands(){

  this.commandCheck = function(message, command, args){
    // structure will always have message in the function args.
    // args is an array [arg1, arg2]
    switch(command){

      // ___CARDS___

      case "runningcount":
      this.runningcount(message);
      break;
      case "resetcount":
      this.resetcount(message);
      break;
      case "countcards":
      this.countCards(message, args);
      break;

      //___HELP___

      case "help":
      this.help(message, args);
      break;

      // ___ENGLISH___

      case "say":
      this.say(message, args);
      break;
      case "unscramble":
      this.unscramble(message, args);
      break;
      case "simp":
      this.simp(message, args);
      break;

      // ___AUDIO___

      case "list":
      this.listFiles(message); // could just change to listfiles at a later date if list should have a better use as another command
      break;
      case "play":
      this.play(message, args);
      break;
      case "leavechannel":
      this.leaveChannel(message);
      break;
      case "nword":
      //this.nword(message);
      break;

      // ___CURRENCY___
      case "bal":
      this.balance(message, args);
      break;
      case "balance":
      this.balance(message,args);
      break;
      case "pay":
      this.pay(message,args);
      break;
      // invalid command

      default:
      this.invalidCommand(message);
    }
  }

  //___CARDS___

  this.resetcount = function(message){
    message.reply(speech.resetCount());
    blackjack.setRunningCount(0);
  }

  this.runningcount = function(message){
    message.reply(speech.runningCount());
  }

  this.countCards = function(message, args){
    blackjack.countCards(args, function(err, data){
      if(err) {
        message.reply("Error:" + err.toString());
        return;
      }
      message.reply(speech.countCards(data));
    });
  };

  //___ENGLISH___

  this.unscramble = function(message, args){
    english.unscramble(args, function(err, j){
      if(err) {
        message.reply(err.toString());
      }
      var arr = j("#form1").find(".clearfix").html().split("\n");
      var newArr = [];
      var argLength = args[0].length;
      try {
      for(let i = 0; i < arr.length; i++){
        if(arr[i].indexOf("</a>") != -1) newArr.push(arr[i].slice(-(argLength+4), -4));
        if(i == arr.length-1) message.reply(speech.unscramble(newArr));
      }
    } catch(e){
      message.reply(e);
    }
  });
  }

  this.say = function(message, args){
    message.channel.send(args.join(" "));
  }

  this.simp = function(message, args){

    message.reply("You are " + Math.round(Math.random()*100) + "% simp");

  }

  // ___AUDIO___

  this.play = function(message, args){
    audio.play(message, args[0]);
  }

  this.leaveChannel = function(message) {
    audio.leave(message);
    message.reply("Okay bye bye.");
  }

  this.listFiles = function(message){ // // TODO: add a space between each element in list when message reply
    audio.list(function(err, data){
      if(err) {
        message.reply(err.toString())
        return;
      }
      message.reply(speech.listFiles(data));
    });
  }

  this.nword = function(message){
    audio.play(message, "nword.mp3");
  };

  // ___BALANCE___

  this.balance = function(message, args){

    if(!args[0]){ // default
    currency.getBalance(message.author, 0, function(err, data){
      if(err){
        message.reply(err);
        return;
      }
      message.reply(speech.balance(data));
    });
  } else {
      if(args[0].slice(0, 2) == "<@"){ // look for it via id
        currency.getBalance(args[0].slice(2, args[0].length-1), 1, function(err, data){
          if(err){
            message.reply("Sorry, couldn't find the user");
            return;
          }
          message.reply(speech.balance(data));

        });
      } else { // look for it via name

        currency.getPersonByName(args[0], message, function(err, data){
          if(err){
            message.reply("Sorry, couldn't find the person :(")
          }
          currency.getBalance(data, 1, function(err, data1){
            if(err){
              message.reply("Sorry, couldn't find the user in the database");
              return;
            }
            message.reply(speech.balance(data1));
          });
        });

      }
    }
  }

  this.pay = function(message, args){
    if(args.length == 2){

      if(args[0].slice(0, 2) == "<@"){
        currency.pay([message.author.id, args[0].slice(2, args[0].length-1)], args[1], function(err, data){
          if(err) {
            message.reply(err);
            return;
          }
          message.reply(data);
        });
      } else {
        currency.getPersonByName(args[0], message, function(err, data){
          if(err){
            message.reply("Sorry, couldn't find the person :(")
          }
          currency.pay([message.author.id, data.id], args[1], function(err, data){
            if(err) {
              message.reply(err);
              return;
            }
            message.reply(data);
          });
        });
      }
    } else if(args.length == 3){

    } else {
      message.reply(speech.shareFail());
    }
  }

  // ___HELP___

  this.help = function(message, args){ // TODO: replace with the embed thing
    var str = "\n";

    var objk = Object.keys(this.descriptions);

    for(let i = 0; i < objk.length; i++){
      str+= objk[i] +": " + this.descriptions[objk[i]] + "\n";
      if(i == objk.length-1) message.reply(str);
    }
  };

  this.invalidCommand = function(message, callback){
    message.reply(speech.invalidCommand());

  };


  this.descriptions = {
    "help ": "Displays available commands",
    "___CARDS___": "",
    "countcards ... ": "Blackjack card counting. Can use [2-10][a-k] as cards.",
    "runningcount ": "Displays running count",
    "resetcount ": "resets running count",
    "___ENGLISH___": "",
    "unscramble ...": "If you give it a scrambled word then it will unscramble the word",
    "say ... ": "repeats the words after the command.",
    "___AUDIO___": "",
    "nword" : "Replies to you by saying the n word.",
    "list": "Lists the playable files that are downloaded (.mp3)",
    "play": "Plays a file from the elements in the list command. You must type in the whole name of the file (optional .mp3)",
    "leavechannel": "Makes the bot leave voice channel",
    "___CURRENCY___": "",
    "bal ...": "Displays your balance, or another user's balance",
    "pay ...": "Takes a certain amount of money from your wallet and pays it forward to someone else."
  }


}

module.exports = Commands;
