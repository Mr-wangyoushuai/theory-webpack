let {AsyncParallelHook} = require('tapable')
// tap 注册 同步
// tapAsync 注册 异步 加一个回调    
// tapPromise 注册 返回promise 调用使用.then
class Lesson {
    constructor () {
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
    }
    tap () {
        this.hooks.arch.tapAsync('node', function(data, resolve) {  
                  setTimeout( () => {
                    console.log('node', data);
                    resolve()
                  },1000)
            
        })
        this.hooks.arch.tapAsync('react', function(data, resolve) {
    
                setTimeout(()=>{
                    console.log('react', data)
                    // resolve()
                },1000)
        })
    }
    call () {
        this.hooks.arch.callAsync('aa',function(){
            console.log('end')
        }) 
    }
}

let l = new Lesson();

l.tap();
l.call();