let loadGoogleAnalytics = (_window, _document, elementName, sourceUrl, gaTag, a, m) => {
    _window['GoogleAnalyticsObject'] = gaTag;
    _window[gaTag] = _window[gaTag] || function () {
        (_window[gaTag].q = _window[gaTag].q || []).push(arguments)
    }, _window[gaTag].l = 1 * new Date();
    a = _document.createElement(elementName),
    m = _document.getElementsByTagName(elementName)[0];
    a.async = 1;
    a.src = sourceUrl;
    m.parentNode.insertBefore(a, m);

};


let sendPageView = (trackerName, location, ga) => {
    let eventType = getSendEventType(trackerName);
    ga(eventType, {
        hitType: 'pageview',
        page: location.pathname + location.hash
    });
}

let getTrackerNameFromHash = (location) => {
    let hash = location.hash;
    let trackerName = hash.replace("#", "");
    return trackerName;
}

let createMultipleTrackers = (trackerNames, ga) => {
    trackerNames.map(trackerName =>
        ga('create', 'UA-12345-6', 'auto', trackerName) 
    );
}

let sendEvent = (trackerName, category, action, eventName, value) => {
    let eventType = getSendEventType(trackerName);
    let eventParams = {
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
    };
    if(eventName)
        eventParams['eventLabel'] = eventName;
       
    if(value)
        eventParams['value'] = value;
    
   // console.log("event params: ", eventParams)
    ga(eventType, eventParams);
}

let sendFilledFieldEvent = (trackerName, that) => {
    
    let id = that.id;
    let value = that.value;
    let isCheckField = id === 'aceito';
    let isChecked = isCheckField && that.checked;

    if((value && !isCheckField) || isChecked)
        sendEvent(trackerName, 'contato', id, 'preencheu', null);
};

let getSendEventType = (trackerName) => {
    return trackerName == null? 'send' : `${trackerName}.send`;
}