let { SyncHook } = require('tapable')

class Lesson {
    constructor () {
        this.hooks = {
             arch: new SyncHook(['name'])
        }
    }
    tap () { // 注册
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name)
        }),
        this.hooks.arch.tap('vue', function (name) {
            console.log('vue', name)
        })
    }
    start () { // 执行
        this.hooks.arch.call('LT','3')
    }
}

let lesson = new Lesson();
lesson.tap();
lesson.start()