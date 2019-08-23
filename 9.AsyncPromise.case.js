class AsyncPromiseHook {
    constructor(){
        this.tasks = []
    }
    tapPromise(name, task){
        this.tasks.push(task)
    }
    promise(...args){
        let taskPromise = this.tasks.map( task => task(...args))
        return Promise.all(taskPromise)
    }
}

let a = new AsyncPromiseHook();
a.tapPromise('node', function(name){
    return new Promise((resolve, reject)=>{
        setTimeout( ()=>{
            console.log('node', name)
            resolve()
        }, 1000)
    })
    
});
a.tapPromise('ed', function(name){
    return new Promise((resolve, reject)=> {
        setTimeout( ()=>{
        console.log('ed', name)
        resolve()
    }, 1000) 
    })
   
});
a.tapPromise('cccc', function(name){
    new Promise((resolve, reject)=>{
        setTimeout( ()=>{
        console.log('cccc', name)
        resolve()
    }, 1000) 
    })
   
});
a.promise('ok').then(()=> {
    console.log('end')
})