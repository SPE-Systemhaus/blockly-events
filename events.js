window.BlocklyPlugins = window.BlocklyPlugins || {};
/*
  A wrapper for the window and Blockly related Events, that are not implemented in Blockly.

  Use BlocklyPlugins.Events.ready(cb) and the other helper Methods to add Listeners
  conveniently

  BlocklyPlugins.Events.types contains all types of supported Events.
*/
(function(){
 var Events = { listeners: []};
 Events.types = {
   WORKSPACE_READY: "WORKSPACE_READY",
   DOCUMENT_READY: "DOCUMENT_READY",
   BEFORE_UNLOAD: "BEFORE_UNLOAD",
   UNLOAD: "UNLOAD",
   LOAD: "LOAD"
 };

 Events.addListener = function(l){
   Events.listeners.push(l);
 };

 Events.fire = function(event){
   Events.listeners.forEach(function(l){l(event);});
 };

 Events.check = function(){
   if(Blockly.mainWorkspace)
     Events.fire(Events.types.WORKSPACE_READY);
   else
     setTimeout(Events.check, 200);
 };

 /*
   Helpers for convienent adding of listeners
 */
 Events.ready = function(cb){
   if(Blockly.mainWorkspace)
     cb();
   else
     Events.addListener(function(e){
       if(e == Events.types.WORKSPACE_READY)
         cb();
     });
 };

 Events.docReady = function(cb){
   Events.addListener(function(e){
     if(e == Events.types.DOCUMENT_READY)
       cb();
   });
 };

 Events.beforeUnload = function(cb){
       Events.addListener(function(e){
       if(e == Events.types.BEFORE_UNLOAD)
         cb();
     });
 };

 Events.unload = function(cb){
     Events.addListener(function(e){
       if(e == Events.types.UNLOAD)
         cb();
     });
 };

 Events.load = function(cb){
       Events.addListener(function(e){
       if(e == Events.types.LOAD)
         cb();
     });
 };

  /*
    Bind our events to native events
  */
  window.addEventListener('beforeunload', function(){
    Events.fire(Events.types.BEFORE_UNLOAD);
  });

  window.addEventListener('unload', function () {
    Events.fire(Events.types.UNLOAD);
  });

  window.addEventListener('load', function () {
    Events.fire(Events.types.LOAD);
  });

  document.addEventListener("DOMContentLoaded", function(event) {
    Events.fire(Events.types.DOCUMENT_READY);
    Events.check();
  });

  Events.check();
  BlocklyPlugins.Events = Events;
})();
