const path = require('path');

module.exports = Franz => {
  const getMessages = () => {
    const $unreadMessageCounter = document.querySelector('#mercurymessagesCountValue');
    let unreadMessageCount = 0;

    if ($unreadMessageCounter) {
      unreadMessageCount = parseInt($unreadMessageCounter.innerText);
    }

    Franz.setBadge(unreadMessageCount);
  };

  Franz.injectCSS(path.join(__dirname, 'workplace.css'));
  Franz.loop(getMessages);
  
  /* Enable desktop notifications in messenger settings */
  localStorage["_cs_desktopNotifsEnabled"] = JSON.stringify({"__t":new Date().getTime(), "__v":true})

  if (typeof Franz.onNotify === 'function') {
    Franz.onNotify((notification) => {
      if (typeof notification.title !== 'string') {
        notification.title = ((notification.title.props || {}).content || [])[0] || 'Work Chat';
      }

      if (typeof notification.options.body !== 'string') {
        notification.options.body = (((notification.options.body || {}).props || {}).content || [])[0] || '';
      }

      return notification;
    });
  }
};
