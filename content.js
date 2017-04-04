//Secruity concerns means you cant use variables from other scripts directly in content
//Thus must pass variables betweem scripts via chrome.runtime.onMessage.addListener()
(function(){
    
    let triggerValueMin;
    let triggerValueMax;

    //Listens for Trigger Value to be passed from Popup.js
    //Calls meetupFilter()
    chrome.runtime.onMessage.addListener(
      
      function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        triggerValueMin = request.triggerMin;   //passed via a message from popup.js's chrome.tabs.sendMessage request
        triggerValueMax = request.triggerMax;   //If "Any" selected then turn any into a really high number
        meetupFilter();
      });


    //Parse out low attendance meetup.com events (DOM nodes w/attendees < trigger value) 
    //Trigger value set by user (via popup.html form)
    function meetupFilter() {
        
      //Find # of Meetup attendees from html tag ID attendee-count and parse out the 3 character and convert to integer
      //Remove from browser DOM any meetup events w/ Attendees < trigger
        //Basically remove everything from node <li row event-listing clearfix doc-padding> to <attendee-count>
      $( ".attendee-count" ).each(function() {     
        let meetupAttendeeCnt = parseInt( this.attributes.class.ownerElement.innerHTML.slice(1,4).replace(/[\n\r]+/g, '') );

        if ( meetupAttendeeCnt < triggerValueMin || meetupAttendeeCnt > triggerValueMax )
          {
            $(this).closest('li.row.event-listing.clearfix.doc-padding').remove();
          };
      });
    }

})();