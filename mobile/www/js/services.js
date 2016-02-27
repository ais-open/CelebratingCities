angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

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
