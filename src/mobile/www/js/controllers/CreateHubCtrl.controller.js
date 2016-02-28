(function() {

angular.module("starter")
  .controller('AccountCtrl', CreateHUBCtrl);

  CreateHUBCtrl.$inject = ["$scope", "Geocoder", "hubSearch", "$location"];

  function CreateHUBCtrl($scope, Geocoder, hubSearch, $location) {
    var vm = $scope;

    vm.search = hubSearch.getData();

    vm.scheduleRide = false;

    vm.processing = false;

    $scope.$watch(hubSearch.getData, function(newSearchData){
      vm.search = newSearchData;
    });

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
 };
})();
