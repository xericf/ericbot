var playerModel = require("../models/player.js");



function Currency() { // TODO: Make it cooldown the thing
  this.getBalance = function(user, type, callback){ // when type == true, it points to the message sender
    if(type == 0){
    playerModel.findOne({userID: user.id}, function(err, data){
      if(err){
        return callback(err, null);
      }
      callback(null, [data.username, data.balance]); // username, and balance TODO: Incorporate banks and stuff
    });
  } else if(type == 1) {
    // user will now actually be just an id or a name.
    playerModel.findOne({userID: user}, function(err, data){
      if(err){

        return callback(err, null);
      }
      callback(null, [data.username, data.balance]);
    });
  }
  }

  this.pay = function(usersID, money, callback){ // ONLY THE IDs ARE SENT!!!!

    //users = [sender, receiver] both users


    playerModel.findOne({userID: usersID[0]}, function(err, data){
      if(err){
        callback("Couldn't find you.", null);
        return;
      }


      if(data.balance - money > 0) {
        playerModel.findOneAndUpdate({userID: usersID[0]}, {$inc: {balance: -money}}, function(err, data){
          if(err){
            callback("Sorry, couldn't find who you are giving B0ssBux to ;(", null);
            return;
          }
          playerModel.findOneAndUpdate({userID: usersID[1]}, {$inc: {balance: money}}, function(err, data){
            if(err){
              callback("Sorry, couldn't find who you are giving B0ssBux to ;(", null);
              return;
          }
          callback(null, "Successful transaction");
          });

        });
      } else {
        callback("You can't pay more than what you have, dummy.", null);
      }


    });

  }

  this.getPersonByName = function(name, message, callback){
    //Gets a name, returns a user
    var guildMembers = message.guild.members.array();
    for(let i = 0; i < guildMembers.length; i++){
      if(guildMembers[i].user.username == name){
        callback(null, guildMembers[i].user);
        return;
      }
      if(guildMembers[i].user.username == name && i == guildMembers.length-1) callback("Couldn't Find Player", null);

    }
  }

}

var c = new Currency();

module.exports = c;
