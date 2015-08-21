(function () {
  'use strict';

	angular
    .module('app')
    .filter('ruleToString', ruleToString);

    ruleToString.$inject = ['$sce'];

    function ruleToString($sce){
			return function(rule){
				var cron = [rule.second, rule.minute, rule.hour, rule.dayOfMonth, rule.month, rule.dayOfWeek];
				cron = cron.join('</code><code class="code-cron">');
				return $sce.trustAsHtml('<code class="code-cron">'+ cron +'</code>');
			};
    }

 })();