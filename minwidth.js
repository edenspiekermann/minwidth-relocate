/**
 * Use like this to bind to certain min-widths:
 * 
 * minwidth(
 *   480, 
 *   function() { 
 *     console.log("Forward Callback")
 *   }, 
 *   function() { 
 *     console.log("Backward Callback")
 *   }
 * );
 * 
 * Copyright by Eike Send
 * http://eike.se/nd
 * 
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function(win){
  var getWindowWidth = function() {
    // Get window width, code adapted from jQuery
    var docwindowProp = doc.documentElement["clientWidth"];
    return doc.compatMode === "CSS1Compat" && docwindowProp 
           || doc.body && doc.body["clientWidth"] 
           || docwindowProp;
  }
  
  var doc = win.document, 
      instances = [],
      oldWidth = 0,
      windowWidth = getWindowWidth();
  
  var resizeCallback = function() {
    windowWidth = getWindowWidth();
    var i, instance;
    for (i = 0; i < instances.length; i++) {
      instance = instances[i];
      // Check Forward:
      if (instance.old < instance.wdt &&
          windowWidth >= instance.wdt &&
          instance.fwd) {
        instance.fwd();
      }
      // Check Backward:
      if (instance.old >= instance.wdt && 
          windowWidth < instance.wdt &&
          instance.bck) {
        instance.bck();
      }
      instance.old = windowWidth;
    }
  }
  
  if (win.addEventListener) {
    win.addEventListener("resize", resizeCallback, false);
  } else {
    win.attachEvent("onresize", resizeCallback);
  }
  
  // This is the function that is exported into the global namespace
  win.minwidth = function(width, forwardCallback, backwardCallback) {
    instances.push({
      wdt: width,
      old: 0,
      fwd: forwardCallback,
      bck: backwardCallback
    });
    resizeCallback();
  } 
  
})(this);

