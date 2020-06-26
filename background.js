
const supportedWebsites = [
  {
    'hostname' : 'www.linkedin.com',
    'default_logo' : '/images/linkedin.png',
    'selector' : '.nav-item__icon--special-inbug',
  }
];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  if (changeInfo.status == 'complete') {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      var url = new URL(tab.url);
      var hostname = url.hostname;

      let website = supportedWebsites.find(o => o.hostname === hostname);
      if(website == undefined || website == null)
        return null;

      let img_url = chrome.extension.getURL(website.default_logo);

      chrome.tabs.executeScript({
        
        code: 'document.querySelector("' +website.selector+ '").src = " '+ img_url +' "'
        
      });


    })
 
  }
});