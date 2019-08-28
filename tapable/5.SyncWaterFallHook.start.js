let {SyncWaterfallHook} = require('tapable')
// 瀑布 往下传递参数是上一个函数的返回值
// 如果某个函数没有返回值 就按上一个的参数返回
class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['aa'])
        }
    }
    tap(){
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name)
            return 'node so good'
        })
        this.hooks.arch.tap('react', function (name) {
            console.log('react', name)
            return 'my react is good'
        })
        this.hooks.arch.tap('vue', function (name) {
            console.log('vue', name)
        })
    }
    call(){
        this.hooks.arch.call('good')
    }
}
let l = new Lesson()
l.tap();
l.call();