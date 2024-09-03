require('dotenv').config();
const tmi = require('tmi.js');
const products = require('./products');

const client = new tmi.Client({
  connection: {
    reconnect: true
  },
  channels: [
    'toxet70969'
  ],
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_ACCESS_TOKEN
  }
});

client.connect();

client.on('message', async (channel, context, message) => {
  const isNotBot = context.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase();

  if (isNotBot) {
    const matchResult = message.match(/^!iamproduct\s+(\d+)$/);
  
    if (matchResult) {
      const index = Number(matchResult[1])
      client.say(channel, `Ти продукт "${products[index].product}" бренду "${products[index].brand}"`);
    }
  }
});