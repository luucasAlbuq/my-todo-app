// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('todo-app', ['ionic','LocalStorageModule']);

/***************************** DON'T TOUCH HERE ********************************/
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
/********************************************************************************/
});

/**
 * Local Storage Prefix
 */
app.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('todo-app');
});

/************************************
 * Define the main controller
 ************************************/
app.controller('mainCtrl', function($scope, $ionicModal, localStorageService){

  var taskData = 'task';
  
  //Initialize the task scope with empty data
  $scope.tasks = [];

  //Initialize the task object
  $scope.task = {};

  /**
   * Configuring the task model, the place where the task it will be created.
   * Basically set the view (template) and the configuration of the create screenc.
   */
  $ionicModal.fromTemplateUrl('../new-task-modal.html',{
    scope:$scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.newTaskModal = modal;
  });

  $scope.openTaskModal = function(index){
    $scope.newTaskModal.show();
  }

  $scope.closeTaskModal = function(){
    $scope.newTaskModal.hide();
  }
  
  /******************************************
   * CRUD basics operations
   ******************************************/
  //fetches task from local storage
  $scope.getTasks = function () {
    if(localStorageService.get(taskData)){
      $scope.tasks = localStorageService.get(taskData);
    }else{
      $scope.tasks = [];
    }
  }
  
  //creates a new task
  $scope.createTask = function () {
    //creating a new task
    $scope.tasks.push($scope.task);
    localStorageService.set(taskData,$scope.tasks);
    $scope.task = {};
    //close new task modal
    $scope.newTaskModal.hide();
  }
  
  //removes a task
  $scope.removeTask = function (index) {
    $scope.tasks.splice(index,1);
    localStorageService.set(taskData, $scope.tasks);
  }
  
  //updates a task as completed
  $scope.completeTask = function (index) {
    if(index !== null && index !== -1){
      $scope.tasks[index].completed = true;
    }
    localStorageService.set(taskData, $scope.tasks);
  }

})
