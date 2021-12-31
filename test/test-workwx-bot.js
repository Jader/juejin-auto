const WorkwxBot = require('../src/lib/WorkwxBot')

const bot = new WorkwxBot({
  webhook: '', // 请填写自己机器人的Webhook地址
})

bot.sendMessage('测试消息')
