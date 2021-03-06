/*:
 * RS_ExitDialog.js
 * @plugindesc This plugin allows you to show up the exit dialog on Android.
 * @author biud436
 *
 * @param Dialog Name
 * @desc Sets up the title of the dialog
 * @default Information Dialog
 *
 * @param Show Custom Dialog Name
 * @desc Sets up whether show as the title of the dialog you specify yourself
 * @default false
 *
 * @param Exit Message
 * @desc Sets up the message to be displayed on the dialog.
 * @default Are you sure you want to quit the game?
 *
 * @param OK Button
 * @desc OK Button's Name
 * @default OK
 *
 * @param Cancel Button
 * @desc Cancel Button's Name
 * @default Cancel
 *
 * @help
 * =============================================================================
 * Installation
 * =============================================================================
 * You will need to have installed the 'cordova-plugin-dialogs' plugin in Cordova CLI.
 *
 * 1. Create a cordova application
 * In case of using a cordova-cli, Before you start build your mobile application,
 * you need to attempt as below.

 * if your cordova version is to 7 or more, you can easily add the plugin by
 * calling as below command:
 *
 *    cordova plugin add cordova-plugin-dialogs
 *
 * =============================================================================
 * How to change a default behavior
 * =============================================================================
 * Scene_Map.prototype.onExit = function () {
 *   // your code add here.
 * };
 * Scene_Battle.prototype.onExit = function () {
 *   // your code add here.
 * };
 * =============================================================================
 * Change Log
 * =============================================================================
 * 2016.04.07  - Added plugin parameters.
 * 2016.05.29  - The incorrect character fixed.
 * 2016.12.19  - Removed a functionality that shows up the dialog only in the title scene.
 * 2017.01.13 - Fixed a bug that causing when pressing a back button several times.
 */

var Imported = Imported || {};
Imported.RS_ExitDialog = true;

var RS = RS || {};
RS.ExitDialog = RS.ExitDialog || {};

(function($) {

  var parameters = PluginManager.parameters('RS_ExitDialog');

  $.Params = {

    'message': parameters['Exit Message'] || "Are you sure you want to quit the game?" ,
    'title': parameters['Dialog Name'] || "Information Dialog",

    // Button
    'okBtn': parameters['OK Button'] || "OK" ,
    'cancelBtn': parameters['Cancel Button'] || "Cancel" ,

    // Check properties
    'isCustomTitleName': Boolean(parameters['Show Custom Dialog Name'] === 'true')

  };

  //============================================================================
  // bind cordova
  //============================================================================

  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
      document.removeEventListener("backbutton", function(){}, false);
      document.addEventListener("backbutton", SceneManager.onExit, false);
  }

  SceneManager.onExit = function() {
      if(SceneManager._scene.onExit) SceneManager._scene.onExit();
  };

  Scene_Base.prototype.onExit = function (e) {
      var title = $dataSystem.gameTitle || document.title;
      var okButtonId = 1;
      if(e && e.preventDefault) e.preventDefault();
      if(!$.Params.isCustomTitleName) title = $.Params.title;
      // The index number starts from 1 (1,2,3...)
      navigator.notification.confirm($.Params.message, function(idx) {
          if(idx === okButtonId) {
              SceneManager.exit();
          }
      }, title, [$.Params.okBtn, $.Params.cancelBtn]);
  };

  //============================================================================
  // Additional Code
  //============================================================================

  // Scene_Map.prototype.onExit = function () {
  //   // your code add here.
  // };
  //
  // Scene_Battle.prototype.onExit = function () {
  //   // your code add here.
  // };

})(RS.ExitDialog);
