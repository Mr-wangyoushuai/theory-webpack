class AsyncSeriesHook{
    constructor(){
        this.tasks = []
    }
    tapPromise(name, task){
        this.tasks.push(task)
    }
    promise(...args){
        let [first, ...others] = this.tasks;
        return others.reduce( (pre, next)=>{
            return pre.then( () => next(...args) )
        }, first(...args))
    }
}

let a = new AsyncSeriesHook();
a.tapPromise('node', function(name){
    return new Promise((resolve, reject)=> {
        setTimeout(()=>{
            console.log('node', name)
            resolve()
        }, 1000)
    })
})
a.tapPromise('react', function(name){
    return new Promise((resolve, reject)=> {
        setTimeout(()=>{
            console.log('react', name)
            resolve()
        }, 1000)
    })
})
a.tapPromise('angular', function(name){
    return new Promise((resolve, reject)=> {
        setTimeout(()=>{
            console.log('angular', name)
            resolve()
        }, 1000)
    })
})

a.promise('askdjf').then(()=>{
    console.log('end Promise')
})