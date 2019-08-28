let { AsyncSeriesWaterfallHook }  = require('tapable');

class Lesson {
    constructor(){
        this.hook = {
            arch: new AsyncSeriesWaterfallHook(['name'])
        }
    }
    tapAsync(){
        this.hook.arch.tapAsync('node', function(name, cb){
            setTimeout(()=>{
                console.log('node', name)
                cb(null,'next,react')
            }, 1000)
        })
        this.hook.arch.tapAsync('react', function(name, cb){
            setTimeout(()=>{
                console.log('react', name)
                cb(null,'next,vue')
            }, 1000)
        })
        this.hook.arch.tapAsync('vue', function(name, cb){
            setTimeout(()=>{
                console.log('vue', name)
                cb(null)
            }, 1000)
        })
    }
    callAsync(){
        this.hook.arch.callAsync('开始学习',function(){
            console.log('end')
        })
    }
}
let l = new Lesson();
l.tapAsync();
l.callAsync();
