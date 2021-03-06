
var CronInstall = require('./lib/cronInstall');

module.exports = function (sails) {

  sails.config.Event.on('sailsReady', function(){

    CronInstall.launcherType(function(err){
      if(err)return sails.log.error('Cron : Install launcherType failed :', err);
      sails.log.info('Cron : Install launcherType OK');
    });
   
    CronInstall.job(function(err){
      if(err)return sails.log.error('Cron : Install jobs failed :', err);
      sails.log.info('Cron : Install jobs OK');
    });

  });  

   
  var loader = require("sails-util-mvcsloader")(sails);
  loader.injectAll({
    policies: __dirname + '/policies',// Path to your hook's policies
    config: __dirname + '/config'// Path to your hook's config
  });

    
  return {
    defaults: require('./lib/defaults'),
    configure: require('./lib/configure')(sails),
    initialize: require('./lib/initialize')(sails),
    routes: require('./lib/routes')(sails),
  };


};