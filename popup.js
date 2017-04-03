function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        
        var trigger_value = document.getElementById("trigger_val").value;
        
        //Send Message to content.js
        chrome.tabs.sendMessage(tabs[0].id, {trigger: trigger_value}, function(response) {
          console.log(response.farewell);
        });

        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});
    });
}

// document.getElementById('clickactivity').addEventListener('click', injectTheScript);
document.addEventListener("DOMContentLoaded", function(event) {
    var b = document.getElementById('clickactivity').addEventListener('click', injectTheScript, false);
});

  