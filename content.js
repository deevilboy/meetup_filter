//Secruity concerns means you cant use variables from other scripts directly in content
//Thus must pass variables betweem scripts via chrome.runtime.onMessage.addListener()

//Listens for Trigger Value to be passed from Popup.js
//Calls meetupFilter()
chrome.runtime.onMessage.addListener(
  var x = {}; 
  var trigger;    //passed via a message from popup.js;

  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    trigger = request.trigger; 
    meetupFilter();
  });


//Parse out low attendance meetup.com events (DOM nodes w/attendees < trigger value) 
//Trigger value set by user (via popup.html form)
function meetupFilter() {
    
  //Find # of attendees from tag ID attendee-count and parse out the 3 character and convert to integer
  //Remove from browser DOM any meetup events w/ Attendees < trigger
    //Basically remove everything from node <li row event-listing clearfix doc-padding> to <attendee-count>
  $( ".attendee-count" ).each(function() {     
    if (parseInt((this.attributes.class.ownerElement.innerHTML.slice(1,4).replace(/[\n\r]+/g, ''))) < trigger  )
      {
      $(this).closest('li.row.event-listing.clearfix.doc-padding').remove()
      }
  });
}

