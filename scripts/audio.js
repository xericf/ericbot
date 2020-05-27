var opus = require('opusscript');
var fs = require("fs");

const config = {
  path: "./audio/"
}


function Audio(){
  this.list = function(callback){
    fs.readdir(config.path, function(err, items) {
      if(err) {
        callback(err, null);
        return;
      }
      callback(null, items);
      /*
    for (var i=0; i<items.length; i++) {
        console.log(items[i]);
    }*/
});
  };

  this.play = function(message, args){ // args is only the index of the args seen in commands.js
      if(message.member.voiceChannel){
        if(args.indexOf(".mp3") == -1) args+=".mp3";
        var voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then((connection) => {
          var dispatcher = connection.playFile("./audio/" + args);
          dispatcher.on("end", (end) => {
            voiceChannel.leave();
          });
        });
      }
      else {
        message.reply("I don't see you in any voice channels, bud.");
      }
  };
//
  this.leave = function(message){
    message.member.voiceChannel.leave();
  }

}

var a = new Audio();

module.exports = a;
