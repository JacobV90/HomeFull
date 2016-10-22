angular.module('app.controllers', [ 'ionic', 'firebase'])

  .controller('ShelterCtrl', function($scope, Shelters, $ionicModal, $firebaseArray) {

    var shelters = [];

    var ref = firebase.database().ref().child('shelters');
    $scope.shelters = $firebaseArray(ref);

    $scope.updateShelters = function(objects){
      var i = 0;
      $scope.shelters[i++] = objects;
    }

  $ionicModal.fromTemplateUrl('templates/shelter-details.html', function(modal) {
          $scope.modalCtrl = modal;
      }, {
          scope: $scope,
          animation: 'slide-in-up',//'slide-left-right', 'slide-in-up', 'slide-right-left'
          focusFirstInput: false
  });

  $scope.openModal = function(shelter) {
    $scope.modalData = {"name": shelter.name, "address": shelter.address};
    $scope.modalCtrl.show();
  };

  $scope.hideModal = function(){
    $scope.modalCtrl.hide();
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
