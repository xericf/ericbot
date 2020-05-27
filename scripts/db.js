var playerModel = require("../models/player.js");
function Db(){
  this.firstRun = function(users){

    var arr = users.array()
    for(let i = 0; i < arr.length; i++){
      playerModel.findOne({userID: arr[i].id}, function(err, player){
        if(err) console.log(err);
        if(!player){
          let playerM = new playerModel({
            userID: arr[i].id,
            username: arr[i].username,
            balance: 0,
            rank: 0,
            created: new Date().toString(),
            cooldown: [],
          });
          playerM.save(function(err, data){
            if(err) console.log(err);
            //console.log(data);
          });
        }
      });
    }
  }
  this.addMember = function(user){

    playerModel.findOne({userID: user.id}, function(err, player){
      if(err) console.log(err);
      if(!player){
        let playerM = new playerModel({
          userID: user.id,
          username: user.username,
          balance: 0,
          rank: 0,
          created: new Date().toString(),
          cooldown: [],
        });
        playerM.save(function(err, data){
          if(err) console.log(err);
          //console.log(data);
        });
      }
    });

  }

}

var db = new Db();

module.exports = db;
