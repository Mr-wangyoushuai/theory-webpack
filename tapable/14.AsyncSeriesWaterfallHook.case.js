class AsyncSeriesWaterfallHook {
    constructor(){
        this. tasks = []
    }
    tapAsync(name, task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let index=0;
        let callback = args.pop();
        let next = (err, data)=>{
            let task = this.tasks[index]
            if(!task || err != null){
                return callback()
            }
            if (index===0) {
                console.log(...args)
                task(...args, next)
            } else {
                task(data, next)
            }
            index++
        }
        next()
    }
}

let a = new AsyncSeriesWaterfallHook(['name'])
a.tapAsync('node', function(name, cb){
    setTimeout(()=>{
        console.log('node', name)
        cb(null, 'node-ok')
    },1000)
})
a.tapAsync('react', function(name, cb){
    setTimeout(()=>{
        console.log('react', name)
        cb('null', 'react-ok')
    },1000)
})
a.tapAsync('vue', function(name, cb){
    setTimeout(()=>{
        console.log('vue', name)
        cb(null, 'vue-ok')
    },1000)
})
a.callAsync('kaishi', function(){
    console.log('end')
})