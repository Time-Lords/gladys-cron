(function () {
  'use strict';

	angular
    .module('app')
    .filter('ruleToString', ruleToString);

    function ruleToString(){
			return function(rule){
				var cron = [rule.second, rule.minute, rule.hour, rule.dayOfMonth, rule.month, rule.dayOfWeek];
				return cron.join(' ');
			};
    }

 })();