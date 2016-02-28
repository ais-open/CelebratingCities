angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Geocoder, hubSearch) {
  var vm = this;

    vm.search = {
      startAt: "",
      arriveAt: "",
      latestTime: "",
      earliestTime: "",
      timingType: "",
      travelDate: "",
      recurring: ""
    };

    vm.processing = false;

    vm.search = function() {
      hubSearch.setData(vm.search)
      .then(function() {
        $location;
      })
    };

  vm.geolocate = function (end) {
    if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latLong = [position.coords.latitude, position.coords.longitude].map(function (coord) {
                return Number(coord).toFixed(5);
            }).toString().replace(",", ", ");
            $scope.$apply(function () {
              vm[end + "At"] = String(latLong);
            });
            Geocoder.getAddress([position.coords.latitude, position.coords.longitude])
                .then(function (address) {
                  vm[end + "At"] = String(address);
                },
                function () {
                  console.warn("Could not find address for location");
                });
        },
        function (error) { console.error(error); },
        {
            timeout: 15000,
            enableHighAccuracy: true,
            maximumAge: 10000
        });
    }
  };

  /* window.setTimeout(function () {
    var input = $(document.querySelector('input[name$=Time]'));
    input.on('mousedown touchstart', function () {
      input.clockpicker('show');
    })
    .clockpicker({
      autoclose: false,
      donetext: 'set',
      twelvehour: true,
      placement: "top"
    });
  }, 600); */
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  }
})

.controller('MapCtrl', function($scope) {

  document.addEventListener("DOMContentLoaded", function () {
            try {
                ////window.setTimeout(onDeviceReady, 2000);
            }
            catch (ex) { }
        }, false);

  window.onMapsApiLoaded = onDeviceReady;

  function onDeviceReady() {
      // Getting the map selector in DOM
    var div = document.getElementById("map_canvas");

    // Invoking Map using Google Map SDK v2 by dubcanada
    var map = new google.maps.Map(div, {
      center: {lat: 39.2991431, lng: -76.708653},
      scrollwheel: false,
      zoom: 12
    });

    // Capturing event when Map load are ready.
    window.setTimeout(function(){

        // Defining markers for demo
        var locations = [{
            position: [39.2991431,-76.708653],
            title: "Marker 1"
        }, {
            position: [39.3169503,-76.7059585],
            title: "Marker 2"
        }];

        // Bind markers
        for (var i = 0; i < locations.length; i++) {
            var marker = new google.maps.Marker({
              map: map,
              position: { lat: locations[i].position[0], lng: locations[i].position[1] },
              title: 'Hello World!'
            });
        }
    }, 0);

    // Function that return a LatLng Object to Map
    function setPosition(lat, lng) {
        return new google.maps.LatLng(lat, lng);
    }
  }
});
