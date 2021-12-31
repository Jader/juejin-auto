const bot = require('./dingtalk-bot')
const WXWorkNotify = require('./WXWorkNotify-bot.js')
const feishuBot = require('./feishu-bot')
const workwxBot = require('./workwx-bot')

module.exports = function message(msg) {
  console.log(msg)
  bot.sendMessage(msg)
  WXWorkNotify(msg)
  feishuBot.sendMessage(msg)
  workwxBot.sendMessage(msg)
}
