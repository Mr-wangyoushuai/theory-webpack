class AsyncSeriesHook {
    constructor(){
        this.tasks = []
    }
    tapAsync(name, task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let callback = args.pop();
        let index = 0;
        let done = () =>{
            if(index == this.tasks.length) return callback();
            this.tasks[index](...args, done)
            index++;
        }
        done()
    }
}

let a = new AsyncSeriesHook();
a.tapAsync('node', function(name, cb){
    setTimeout(()=>{
        console.log('node', name)
        cb()
    },1000)
});
a.tapAsync('react', function(name, cb){
    setTimeout(()=>{
        console.log('react', name)
        cb()
    },1000)
});
a.tapAsync('vue', function(name, cb){
    setTimeout(()=>{
        console.log('vue', name)
        cb()
    },1000)
});
a.callAsync('学的不错', function(){
    console.log('end')
});