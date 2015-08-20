'use strict';

var schedule = require('node-schedule');

// Sheduler object by id
var schedulers = {};

module.exports = {

	/**
	 * @method start
	 * @param rule
	 * @param callback
	 */
	start: function(ruleId, callback){
		callback = callback || function(){};

		if(schedulers[ruleId]){
			sails.log.warn('CronService.start : Rule '+ ruleId +' is already started');
			return callback();
		}

		CronRule.findOne(ruleId, function(err, rule){
			if(err)return callback(err);

			var stringRule = [rule.second, rule.minute, rule.hour, rule.dayOfMonth, rule.month, rule.dayOfWeek].join(' ');
			var code = sails.config.cron.launcherTypes[0].code;
			var fn = ScenarioService.launcher.bind(null, code, rule.id);

			schedulers[rule.id] = schedule.scheduleJob(stringRule, fn);
			return callback();
		});
	},

	/**
	 * @method destroy
	 * @param rule
	 * @param callback
	 */
	destroy: function(ruleId, callback){
		callback = callback || function(){};

		if(!schedulers[ruleId]){
			sails.log.warn('CronService.destroy : Rule '+ ruleId +' is not started');
			return callback();
		}

		schedulers[ruleId].cancel();
		schedulers[ruleId] = undefined;

		callback();
	}

};
