const Slimbot = require('slimbot');
const fetch = require('node-fetch');

const token = '302518092:AAHRopkkVwpgccNxSrgVgQJDuUlAj3Qsp9M';
const alexbot = new Slimbot(token);

alexbot.on('message', (message) => {
  if (!message.text) {
    return;
  }

  const parsedMessage = message.text.split(' ');
  const command = parsedMessage.shift();
  const info = parsedMessage.join('_');

  if (command !== '/alex') {
    return;
  }

  fetch(`https://es.wikipedia.org/w/api.php?action=opensearch&search=${info}&limit=1&format=json`)
    .then(response => response.json())
    .then((json) => {
      const resText = json[3][0];
      alexbot.sendMessage(message.chat.id, resText);
    });
});


alexbot.startPolling();
