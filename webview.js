const path = require('path');

module.exports = Franz => {
  const getMessages = () => {
    const $messages = document.querySelector('.uiScrollableAreaContent');
    const $unreadMessages = $messages.querySelectorAll('._1ht3 ._1ht6');

    Franz.setBadge($unreadMessages.length);
  };

  Franz.injectCSS(path.join(__dirname, 'workplace.css'));
  Franz.loop(getMessages);
};
