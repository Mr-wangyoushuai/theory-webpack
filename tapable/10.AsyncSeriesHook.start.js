let { AsyncSeriesHook } = require('tapable');

class Lesson{
    constructor(){
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }
    tap(){
        this.hooks.arch.tapAsync('node', function(name, cb){
            setTimeout( ()=>{
                console.log('node', name)
                cb()
            }, 1000)
        }) 
        this.hooks.arch.tapAsync('re', function(name, cb){
            setTimeout( ()=>{
                console.log('re', name)
    
            }, 1000)
        }) 
        this.hooks.arch.tapAsync('ve', function(name,cb){
            setTimeout( ()=>{
                console.log('ve', name)
                cb()
            }, 1000)
        }) 
    }
    call(){
        this.hooks.arch.callAsync('学好了', function(){
            console.log('end')
        })
    }
}

let l = new Lesson();
l.tap()
l.call();