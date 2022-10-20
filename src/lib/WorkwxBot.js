const axios = require('axios')
const crypto = require('crypto')
const dayjs = require('dayjs')


class WorkwxBot {
    constructor(options = {}) {
        this.text = ''
        this.webhook = options.webhook
    }

    send(data) {
        let p
        // 没有这两个参数则静默失败
        if (!this.webhook) {
            p = Promise.resolve({
                errcode: -1,
                errmsg: 'webhook不能为空',
            })
        } else {
            p = axios({
                url: this.webhook,
                method: 'POST',
                data,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            }).then((res) => {
                return res.data
            })
        }
        return p
    }

    sendMessage(msg) {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
        // 由于GitHub Action使用的是UTC时间 所以需要转成东八区
        let time = dayjs().add(8, 'hour')
        this.text += `- ${time.format('HH:mm:ss')} ${msg}\n`
        this.timer = setTimeout(() => {
            this.send({
                msgtype: 'markdown',
                markdown: {
                    content: `掘金签到日志\n
                    >${this.text}`,
                }
            }).then(() => {
                this.text = ''
            })
        }, 1000)
    }
}

module.exports = WorkwxBot
