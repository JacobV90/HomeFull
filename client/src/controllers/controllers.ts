angular.module('app.controllers', [ 'ionic', 'firebase', 'ngAnimate'])

  .controller('ShelterCtrl', function($scope, $ionicModal, $firebaseArray) {

  var alone = false;
  var group = false;
  var ref = firebase.database().ref().child('shelters');
  $scope.shelters = $firebaseArray(ref);
  $scope.userData = {};
  $scope.emergency = false;
  $scope.user = {
    age: "",
    gender: "",
    comment: "",
  }

  $scope.categories = [
    {
      name: "Life threatening?",
      value: $scope.emergency,
      label: "emergency"
    },
    {
      name: "Are you alone?",
      value: alone,
      label: "alone"
    },
    {
      name: "In a group",
      value: group,
      label: "group"
    }
  ];

  $ionicModal.fromTemplateUrl('templates/shelter-details.html',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.shelterModal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/user-details.html',{
    scope: $scope,
    animation: 'slide-in-down'
  }).then(function(modal) {
    $scope.userModal = modal;
  });

  $scope.openShelter = function(shelter) {
    $scope.shelter = {"name": shelter.name, "address": shelter.address};
    $scope.shelterModal.show();
  };

  $scope.openUser = function() {
    $scope.userModal.show();
  };

  $scope.hideShelter = function(){
    $scope.shelterModal.hide();
  };

  $scope.hideUser = function(){
    $scope.userModal.hide();
    console.log($scope.emergency);
  };

  $scope.toggleCategory = function(category) {

    if ($scope.isCategoryShown(category)) {
      $scope.shownCategory = null;
      if(category.label === "emergency"){
        $scope.emergency = false;
      }
    } else {
      $scope.shownCategory = category;
      if(category.label === "emergency"){
        $scope.emergency = true;
      }
    }
  };

  $scope.isCategoryShown = function(category) {
    return $scope.shownCategory === category;
  };

})
.controller('FormCtrl', function($scope, $ionicModal){

  $scope.openForm = function() {
    $scope.modal.show();
  };

  $scope.closeForm = function(){
    $scope.modal.hide();
  };

})
.controller('GeoCtrl', function($cordovaGeolocation) {

  var lat = null;
  var long = null;

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      lat  = position.coords.latitude
      long = position.coords.longitude
    }, function(err) {
      // error
    });


  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
      lat  = position.coords.latitude
      long = position.coords.longitude
  });

  function calculateDistance(lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat);
    var dLon = toRad(lon2 - long);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }
  function toRad(value) {
    return value * Math.PI / 180;
  }


  watch.clearWatch();
  // OR
  $cordovaGeolocation.clearWatch(watch)
    .then(function(result) {
      // success
      }, function (error) {
      // error
    });
})
.controller('MapController', function($scope, $cordovaGeolocation, $ionicPlatform ,$ionicLoading) {

    /*$ionicPlatform.ready(function(){
      $ionicLoading.show({
                  template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
              });

              var options = {timeout: 10000, enableHighAccuracy: true};

      $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      }, function(error){
        console.log("Could not get location");
      });
    })*/
});
