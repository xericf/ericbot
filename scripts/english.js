const rp = require('request-promise');
const cheerio = require('cheerio');

var unscrambleOptions = {
  uri: `https://www.wordunscrambler.net/?word=`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

function English(){
  this.unscramble = function(args, callback){
    unscrambleOptions.uri = 'https://www.wordunscrambler.net/?word=' + args[0];
    rp(unscrambleOptions).then(function(data){
      callback(null, data);
    }).catch(function(err){
      callback(err, null);
    });
  }

}

var e = new English();

module.exports = e;
