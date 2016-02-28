(function() {
  angular.module("starter")
    .controller('DashCtrl', function($scope, Geocoder, hubSearch, $location) {
      var vm = this;

        vm.search = {
          startAt: "",
          arriveAt: "",
          latestTime: "",
          earliestTime: "",
          timingType: "",
          travelDate: "",
          recurring: "",
        };

        vm.scheduleRide = false;

        vm.processing = false;

        vm.findHubs = function() {
          hubSearch.setData(angular.copy(vm.search))
          .then(function() {
            $location.path("tab/dash/results");
          });
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
                      vm.search[end + "At"] = String(address);
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
    });
})();
