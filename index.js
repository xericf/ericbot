// TODO: https://discordapp.com/oauth2/authorize?client_id=527722557059760136&scope=bot&permissions=8
var mongoose = require("mongoose");
var Discord = require('discord.js');
var cfg = require('./config.json'); // Configure logger settings
const Commands = require("./scripts/commands.js");
var db = require("./scripts/db.js");


const commands = new Commands();
var bot = new Discord.Client(); // Initialize Discord Bot
mongoose.connect("mongodb://stormcoin:19941122CHeese@ds135522.mlab.com:35522/ericbot");


bot.on('ready', function () {
    console.log("logged in as: ");
    console.log(bot.users.get('527722557059760136').username);
    db.firstRun(bot.users);
});

bot.on('guildCreate', function(guild){
  db.firstRun(guild.members)
});
bot.on('guildMemberAdd', function(guildMember){
  db.addMember(guildMember);
});

bot.on('message', (message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(cfg.prefix) !== 0) return;

  var msg = message.content.slice(cfg.prefix.length).trim().split(" ");
  var command = msg[0].toLowerCase();
  var args = msg.slice(1); //if something is case insensitive just make it that in the command script itself

  commands.commandCheck(message, command, args);


});

bot.login(cfg.token);
