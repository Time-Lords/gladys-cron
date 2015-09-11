(function () {
  'use strict';

  angular
    .module('app')
    .controller('cronController', cronController);

  cronController.$inject = ['cronService'];

  function cronController(cronService){
		/* jshint validthis: true */
		var vm = this;

		/* Method */
		vm.addRule = addRule;
		vm.destroyRule = destroyRule;
		vm.updateRule = updateRule;
		vm.editRule = editRule;

		/* Infos */
		vm.rules = [];
		vm.error = {};

		/* Template config */
		vm.modal = false;

		/* Form */
		vm.new_rule = {};
		vm.edit_rule = {};
		var edit_rule = {};

		activate();

		function activate() {
			getRules();
		}

		function setError(key, err){
			vm.error[key] = err;
		}

		function getRules(){
			return cronService.getRules()
				.then(function(rules){
					vm.rules = rules;
				});
		}

		function addRule(){
			setError('addRule', false);

			return cronService.addRule(vm.new_rule)
				.then(function(rule){
					vm.new_rule = {};
					vm.rules.push(rule);
					vm.modal = false;
				})
				.catch(setError.bind(null, 'addRule'));
		}

		function destroyRule(rule){
			return cronService.destroyRule(rule)
				.then(function(){
					vm.rules.splice(vm.rules.indexOf(rule), 1);
				});
		}

		function updateRule(){
			setError('updateRule', false);

			return cronService.updateRule(vm.edit_rule)
				.then(function(rule){
					vm.rules.splice(vm.rules.indexOf(edit_rule), 1, rule);
					vm.modal = false;
				})
				.catch(setError.bind(null, 'updateRule'));
		}

		function editRule(rule){
			edit_rule = rule;
			vm.edit_rule = angular.copy(rule);
			vm.modal = 'edit';
		}

  }
})();