angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Giant Food on 33rd',
    address: '601 E 33rd Street',
    distance: 0.3,
    duration: 6,
    leaveTime: '7:06am',
    arriveTime: '7:12am',
    endPoint: 'West Balitmore (MARC)'
  },{
    id: 1,
    name: '7-11 in Lucille Park',
    address: '5129 Reisterstown Rd',
    distance: 0.6,
    duration: 9,
    leaveTime: '7:20am',
    arriveTime: '7:29am',
    endPoint: 'West Balitmore (MARC)'
  },{
    id: 2,
    name: 'ALDI East Arlington',
    address: '3601 W Cold Spring Ln',
    distance: 1.1,
    duration: 12,
    leaveTime: '7:01am',
    arriveTime: '7:13am',
    endPoint: 'West Balitmore (MARC)'
  }, ];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Geocoder', function($http, $q) {
  var baseUrl = "https://maps.google.com/maps/api/geocode/json";

  return {
    getAddress: function(coords) {
      var deferred = $q.defer();

      try {
        $http({
          method: "GET",
          url: baseUrl + "?sensor=false&latlng=" + encodeURIComponent(String(coords))
        }).then(function (response) {
          try {
            var json = response.data;
            if (json && json.results && json.results.length && json.results[0].formatted_address) {
              deferred.resolve(json.results[0].formatted_address);
            }
            else {  
              deferred.reject("Unexpected JSON response format: results[0].formatted_address not found");
            }
          }
          catch (ex) {
            deferred.reject("Cannot parse response as JSON");
          }
        }, deferred.reject);
      }
      catch (ex) {
        deferred.reject(ex.message);
      }

      return deferred.promise;
    }
  };
});
