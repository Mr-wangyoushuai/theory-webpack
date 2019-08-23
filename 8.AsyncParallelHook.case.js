class AsyncParallelHook {
    constructor() {
        this.tasks = []
    }
    tapAsync(name, fn) {
        this.tasks.push(fn)
    }
    callAsync(...args){
        let callback = args.pop();
        let index = 0;
        let done = () => {
            index++;
            if(index == this.tasks.length){
                callback()
            }
        }
        this.tasks.forEach( task => {
            task(...args, done)
        })
    }
}


let a = new AsyncParallelHook(['name']);
a.tapAsync('node', function(name, cb){
    
    setTimeout( ()=>{
        console.log('nood',name)
        cb() 
    },1000)
    
});
a.tapAsync('react', function(name, cb){
    setTimeout( ()=>{
        console.log('reafdsdft',name)
        cb() 
    },1000)
    
});
a.callAsync('ok', function (){
    console.log('end')
});
