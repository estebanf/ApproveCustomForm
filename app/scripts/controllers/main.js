'use strict';

/**
 * @ngdoc function
 * @name approveCustomFormApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the approveCustomFormApp
 */
angular.module('approveCustomFormApp')
  .controller('MainCtrl', ['$scope','everteam','$loadingOverlay','$window',function ($scope,everteam,$loadingOverlay,$window) {
    $scope.data = {};
    $loadingOverlay.show('Loading task ...');
    everteam.getTask()
      .then(function(data){
        console.log(data);
        $scope.object = data['tms:getTaskResponse']['tms:task']['tms:input'];
        $scope.data.RequestId = $scope.object.ReviewContent.Request.RequestId.$;
        $scope.data.Requestor = $scope.object.ReviewContent.Request.Requestor.$;
        $scope.data.Timestamp = $scope.object.ReviewContent.Request.Timestamp.$;
        $scope.data.Amount = $scope.object.ReviewContent.Request.Content.Amount.$;
        $scope.data.Comments = $scope.object.ReviewContent.Request.Content.Comments.$;
        $scope.data.Reason = $scope.object.ReviewContent.Request.Content.Reason.$;
        $scope.data.Urgent = $scope.object.ReviewContent.Request.Content.Urgent.$;
        $loadingOverlay.hide();
      });
    var complete = function(){
      $loadingOverlay.show('Completing task ...');
      everteam.completeTask($scope.object)
        .then(function(data){
          console.log(data);
          $loadingOverlay.hide();
          $window.location.assign('/everteam/workflow/script/empty.jsp');
        });
    };
    $scope.approve = function(){
      $scope.object.ReviewContent.Approved.$ = 'Approved';
      complete();
    };
    $scope.reject = function() {
      $scope.object.ReviewContent.Approved.$ = 'Rejected';
      complete();
    };
  }]);
