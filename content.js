

var i =0;
var x = {}; 
var trigger;


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    trigger = request.trigger; 
    meetupFilter();
 
  });


function meetupFilter() {
    console.log("beg:");
    
    $( ".attendee-count" ).each(function() {     
      x[i] = parseInt((this.attributes.class.ownerElement.innerHTML.slice(1,4).replace(/[\n\r]+/g, '')));
      i++;
      console.log("x[i] " + x[i]);

      if (parseInt((this.attributes.class.ownerElement.innerHTML.slice(1,4).replace(/[\n\r]+/g, ''))) < trigger  )
        {
        $(this).closest('li.row.event-listing.clearfix.doc-padding').remove()
        }
    });
}

