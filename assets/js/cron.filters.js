(function () {
  'use strict';

	angular
    .module('app')
    .filter('ruleToString', ruleToString)
    .filter('errorToString', errorToString);

    ruleToString.$inject = ['$sce'];

    function ruleToString($sce){
			return function(rule){
				var cron = [rule.second, rule.minute, rule.hour, rule.dayOfMonth, rule.month, rule.dayOfWeek];
				cron = cron.join('</code><code class="code-cron">');
				return $sce.trustAsHtml('<code class="code-cron">'+ cron +'</code>');
			};
    }

    function errorToString(){
			return function(error){
				if(!error)return;
				
				var errorString = '';

				if(error.error == 'E_VALIDATION'){
					var errorString = error.summary || '';
					if(error.invalidAttributes){
						var invalidAttributes = [];
						angular.forEach(error.invalidAttributes, function(value, key){
							this.push(key);
						}, invalidAttributes);
						errorString += ' ('+ invalidAttributes.join(', ') +')';
					}
				}

				return errorString;
			};
    }

 })();