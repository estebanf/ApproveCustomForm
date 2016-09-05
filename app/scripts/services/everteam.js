'use strict';

/**
 * @ngdoc service
 * @name approveCustomFormApp.everteam
 * @description
 * # everteam
 * Factory in the approveCustomFormApp.
 */
angular.module('approveCustomFormApp')
  .config( ['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true);
  }])
  .factory('everteam', ['$location','$http','$q',function ($location,$http,$q) {
    var _tmsUrl = '/everteam/ode/processes/TaskManagementServices.TaskManagementServicesSOAP/';
    var _completeTaskUrl = '/everteam/ode/processes/completeTask';

    var _params = {
      url : $location.absUrl(),
      taskid : $location.search().id,
      tasktype : $location.search().type,
      taskurl : $location.search().url,
      token : $location.search().token,
      user : $location.search().user,
      claimTaskOnOpen : $location.search().claimTaskOnOpen
    };

    var basePayload = function(url) {
      return {
        method:'POST',
        headers: {
          'Content-Type':'application/json/badgerfish'
        },
        url: url,
        data:{ }
      };
    };
    var buildCompleteTask = function(data){
      var payload = basePayload(_completeTaskUrl);
      payload.data = {
        'ib4p:completeTaskRequest':{
          '@xmlns':{
            'ib4p':'http://www.intalio.com/bpms/workflow/ib4p_20051115'
          },
          'ib4p:taskMetaData':{
            'ib4p:taskId':{
              '$':_params.taskid
            }
          },
          'ib4p:participantToken':{
            '$':_params.token
          },
          'ib4p:user':{
            '$':_params.user
          },
          'ib4p:taskOutput':data
        }
      };
      console.log(JSON.stringify(payload));
      console.log(payload);
      return payload;
    };
    var buildGetTaskDetail = function(){
      var payload = basePayload(_tmsUrl);
      payload.data = {
        'tas:getTaskRequest':{
          '@xmlns':{
            'tas':'http://www.intalio.com/BPMS/Workflow/TaskManagementServices-20051109/'
          },
          'tas:taskId':{
            '$':_params.taskid
          },
          'tas:participantToken':{
            '$':_params.token
          }
        }
      };
      return payload;
    };
    var buildApi = function(api,data){
      var deferred = $q.defer(); 
      $http(api(data))
        .success(function(data){
          deferred.resolve(data);
        }).error(function(data){
          deferred.reject(data);
        });
      return deferred.promise;
    };
    return {
      getTask: function(){
        return buildApi(buildGetTaskDetail);
      },
      completeTask: function(data){
        return buildApi(buildCompleteTask,data);
      }
    };
  }]);
