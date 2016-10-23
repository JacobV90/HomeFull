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

  $scope.emergency = function(){
    $scope.alone = !$scope.alone;
    $scope.group = !$scope.alone;
  };

  $scope.toggleCategory = function(category) {
    var theone = category.label;
    switch(theone){
      case "emergency":
          alone = !alone;
          group = !group;
          $scope.categories[1].value = alone;
          $scope.categories[2].value = group;
          $scope.emergency = true;
          break;
      case "alone":
          group = !group;
          $scope.categories[2].value = group;
          break;
      case "group":
          alone = !alone;
          $scope.categories[1].value = alone;
          break;
    }

    if ($scope.isCategoryShown(category)) {
      $scope.shownCategory = null;
    } else {
      $scope.shownCategory = category;
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

});
