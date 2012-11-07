/**
 * Use minwidth() to bind callbacks to changes of
 * the window width or a minimum width at page load.
 * 
 * Copyright by Eike Send, Edenspiekermann AG
 * 
 * Licensed under the GPLv2 and the MIT license
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
      oldWidth =  getWindowWidth(),
      windowWidth = getWindowWidth();
  
  var resizeCallback = function() {
    var i, instance;
    windowWidth = getWindowWidth();
    if (oldWidth == windowWidth) return;
    instances.sort(function(a, b){ 
      return oldWidth < windowWidth ? a.w > b.w : a.w < b.w;
    });
    for (i = 0; i < instances.length; i++) {
      instance = instances[i];
      // Check Forward:
      if (oldWidth < instance.w &&
          windowWidth >= instance.w &&
          instance.f) {
        instance.f(); // forward callback
      }
      // Check Backward:
      if (oldWidth >= instance.w && 
          windowWidth < instance.w &&
          instance.b) {
        instance.b(); // backward callback
      }
    }
    oldWidth = windowWidth;
  }
  
  if (win.addEventListener) {
    win.addEventListener("resize", resizeCallback, false);
  } else {
    win.attachEvent("onresize", resizeCallback);
  }
  
  // This is the function that is exported into the global namespace
  // The paramaters are:
  // * the width at which the callbacks are called
  // * the callback going from below to above the width, this is 
  //   initially called if the screen width is wider that "width"
  // * the callback going back from above the width to below it
  // * if the fourth paramater is passed as "true", the forward callback
  //   is initally not called, but the backward callback is called
  //   if the screenwidth is smaller than width.
  win.minwidth = function(width, forwardCallback, backwardCallback, desktopFirst) {
    instances.push({
      wdt: width,
      old: desktopFirst ? 1E9 : 0,
      fwd: forwardCallback,
      bck: backwardCallback
    });
    if (windowWidth > width && !desktopFirst) {
      forwardCallback();
    }
    if (windowWidth < width && desktopFirst) {
      backwardCallback();
    }
  } 
  
})(this);

