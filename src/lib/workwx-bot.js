const WorkwxBot = require('./WorkwxBot')
const config = require('./config')

const workwxBot = new WorkwxBot({
    webhook: config.WORKWX_WEBHOOK // Webhook地址
})

module.exports = workwxBot