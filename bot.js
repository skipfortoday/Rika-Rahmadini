const TelegramBot = require("node-telegram-bot-api");
const token = "1876884468:AAGIb_Yl-WqR2j81P74kaZ3s0bYxA9zgaYA";
const bot = new TelegramBot(token, { polling: true });
const axios = require('axios').default;


bot.on(/\/start/, function name(msg) {
  bot.sendMessage(msg.chat.id, "Hai Rika Rahmadini :)");
});

bot.onText(/\/love/, function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['/okay Yes, you are the bot of my life ❤'],
        ['No, sorry there is another one...']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
});

bot.on(/\/okay/, function name(msg) {
  bot.sendMessage(msg.chat.id, "okay Rika Rahmadini :)");
});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function onEchoText(msg, match) {
  const resp = match[1];
  bot.sendMessage(msg.chat.id, resp);
});


// Matches /editable
bot.onText(/\/editable/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Edit Text',
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: 'edit'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Original Text', opts);
});


// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'edit') {
    text = 'Edited Text';
  }

  bot.editMessageText(text, opts);
});

bot.onText(/\/news/, (msg)=>{
axios.get('https://developers.coinmarketcal.com/v1/events', { headers : {
  'x-api-key': 'mg3czw2p4J9X3M4ygmctn19yeg9hMWtu8sftMGLY' 
}})
  .then(function (response) {
    // handle success
    console.log(response.data.body[0]);
    bot.sendMessage(msg.chat.id, `Judul Berita : ${response.data.body[0].title.en} , Coin :  ${response.data.body[0].coins[0].fullname}, Tanggal Event : ${response.data.body[0].date_event}, Sumber : ${response.data.body[0].source}`, {
      reply_to_message_id: msg.message_id,
   });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
});

