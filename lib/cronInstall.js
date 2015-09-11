'use strict';

function installLauncherType(launcher, callback){
	LauncherType.find({code: launcher.code})
		.exec(function(err, launchers){
			if(err) return callback(err);

			if(launchers.length === 0){
				return LauncherType.create(launcher, callback);
			}
			callback(null);
		});
}

module.exports = {

	/**
	 * Install the launcherType to Gladys database when sails is ready
	 * @method launcherType
	 * @param {} callback
	 */
	launcherType : function(callback){
		callback = callback || function(){};

		var nb_launcher = sails.config.cron.launcherTypes.length;
		var nb_error = 0;

		var callbackInstall = function(err){
			if(err)nb_error++;

			nb_launcher--;
			if(nb_launcher === 0){
				if(nb_error > 0)return callback(nb_error +' errors');
				return callback(null);
			}
		};

		for(var i = 0; i < sails.config.cron.launcherTypes.length; i++){
			var launcher = sails.config.cron.launcherTypes[i];
			installLauncherType(launcher, callbackInstall);
		}
	},

	/**
	 * Initialise the jobs when sails is ready
	 * @method job
	 * @param {} callback
	 */
	job : function(callback){
		callback = callback || function(){};

		CronRule.find()
			.exec(function(err, rules){
				if(err)return callback(err);

				var nb = rules.length;
				var error = 0;

				var callbackInstall = function(err){
					if(err)error++;

					nb--;
					if(nb === 0){
						if(error > 0)return callback(error +' errors');
						return callback(null);
					}
				};

				for(var i = 0; i < rules.length; i++){
					CronService.start(rules[i].id, callbackInstall);
				}

			});
	
	}

};