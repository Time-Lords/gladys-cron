(function () {
  'use strict';
  angular
    .module('app')
    .factory('cronService', cronService);

    cronService.$inject = ['$http','$q'];

    function cronService($http, $q) {
      return {
        getRules: getRules,
        addRule: addRule,
        destroyRule: destroyRule,
        updateRule: updateRule
      };

      function error(data, status, headers, config){
        console.log(data, status, headers, config);
      }

      function request(method, url, data){
        var deferred = $q.defer();
        $http({method: method, url: '/cron' + url, data: data })
          .success(function(data, status, headers, config) {
            if(data.result == 'success'){
              deferred.resolve(data.value);
            }else{
             deferred.reject(data.value);
            }
          })
          .error(error);
        return deferred.promise;
      }

      function getRules(){
        return request('GET', '/indexDashboard', {});
      }

      function addRule(rule){
        return request('POST', '/add', rule);
      }

      function destroyRule(rule){
        return request('POST', '/destroy', {id: rule.id});
      }

      function updateRule(rule){
        return request('POST', '/update', rule);
      }

		}
})();