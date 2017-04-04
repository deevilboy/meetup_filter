//Inject content.js code into the current chrome tab
(function(){


  function injectTheScript() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          
          let trigger_value_min = document.getElementById("trigger_val_min").value;
          let trigger_value_max = document.getElementById("trigger_val_max").value;

          //If "Any" selected, then turn any into a really high number
  // console.log("trigger_value_max.typeOf: ");
          if (trigger_value_max === "Any"){
            trigger_value_max = 9999;
            parseInt(trigger_value_max);
          } else {
            parseInt(trigger_value_max);
          };
          
          //Send (trigger value) Message to content.js 
          chrome.tabs.sendMessage(tabs[0].id, {triggerMin: trigger_value_min, triggerMax: trigger_value_max}, function(response) {
            console.log(response.farewell);
          });

          //Qery the active tab, which will be only one tab
          //and inject the script in it
          chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});
      });
  }

  //Listen for button click from popup.html form
  // document.getElementById('clickactivity').addEventListener('click', injectTheScript);
  document.addEventListener("DOMContentLoaded", function(event) {
      let b = document.getElementById('clickactivity').addEventListener('click', injectTheScript, false);
  });


})();