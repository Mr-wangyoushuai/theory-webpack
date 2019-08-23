let { SyncBailHook } = require('tapable');

class Lesson {
    constructor(){
        this.hooks = {
            arch: new SyncBailHook(['cc'])
        };
    }
    tap(){
        this.hooks.arch.tap('node', function (name) {
            console.log('node', name)
            return undefined
        })
        this.hooks.arch.tap('vue', function (name) {
            console.log('vue', name)
        })
    }
    start(){
        this.hooks.arch.call('11')
    }
}

let l = new Lesson();
l.tap()
l.start();
