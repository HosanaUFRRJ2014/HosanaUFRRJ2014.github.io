let loadGoogleAnalytics = (_window, _document, elementName, sourceUrl, gaTag, a, m) => {
    _window['GoogleAnalyticsObject'] = gaTag;
    _window[gaTag] = _window[gaTag] || function () {
        (_window[gaTag].q = _window[gaTag].q || []).push(arguments)
    }, _window[gaTag].l = 1 * new Date();
    a = _document.createElement(elementName),
    m = _document.getElementsByTagName(elementName)[0];
    a.async = 1;
    a.src = sourceUrl;
    m.parentNode.insertBefore(a, m)
};


let sendPageView = (location, ga) => {
    ga('send', {
        hitType: 'pageview',
        page: location.pathname + location.hash
    });
}


let sendEvent = (category, action, eventName, value) => {
    let eventParams = {
        hitType: 'event',
        eventCategory: category,
        eventAction: action,
    };
    if(eventName)
        eventParams['eventLabel'] = eventName;
       
    if(value)
        eventParams['value'] = value;
    
    console.log("event params: ", eventParams)
    ga('send', eventParams);
}

let sendFilledFieldEvent = (that) => {
    
    let id = that.id;
    let value = that.value;
    let isCheckField = id === 'aceito';
    let isChecked = isCheckField && that.checked;

    if((value && !isCheckField) || isChecked)
        sendEvent('contato', id, 'preencheu', null);
};