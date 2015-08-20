'use strict';

/**
 * Module Configuration
 */


var param = require('./parametres.js');

module.exports.cron = {
    
  // title for the Hook
  title: 'cron',
	// the name of the hook folder
  folderName: param.folderName,

  launcherTypes : [
    {
      code : 'cron',
      name : 'Cron',
      description : 'Fire with your cron rule',
      optionspath : '/cron/index'
    }
  ]

};
