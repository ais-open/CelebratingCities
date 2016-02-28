(function() {
  "use strict";

  angular.module("starter")
    .service("hubSearch", HubSearchService);

    HubSearchService.$inject = ["$http", "$q"];

    function HubSearchService($http, $q){

      var _searchData = {};



      //interface
      var service = {
        getData: function() {
            return _searchData;
        },
        setData: function(value) {
          _searchData = value;

          var promise = $q(function(resolve, reject) {
            resolve();
          });

          return promise;
        }
      };

      return service;
    };

})();
