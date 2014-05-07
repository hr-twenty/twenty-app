function onDeviceReady() {
    if (parseFloat(window.device.version) >= 7.0) {
          document.body.style.marginTop = "20px";
          // OR do whatever layout you need here, to expand a navigation bar etc
    }
    navigator.splashscreen.hide();
}
 
 
document.addEventListener('deviceready', onDeviceReady, false);