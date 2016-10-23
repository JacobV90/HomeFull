angular.module('app.controllers', [ 'ionic', 'firebase'])

  .controller('ShelterCtrl', function($scope, $ionicModal, $firebaseArray) {

    //var shelters = Shelters.all();

  var ref = firebase.database().ref().child('shelters');
  $scope.shelters = $firebaseArray(ref);

  $ionicModal.fromTemplateUrl('templates/shelter-details.html',{
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function(shelter) {
    $scope.modalData = {"name": shelter.name, "address": shelter.address};
    $scope.modal.show();
  };

  $scope.hideModal = function(){
    $scope.modal.hide();
  }

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});
