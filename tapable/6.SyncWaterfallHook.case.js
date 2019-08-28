class SyncWaterfallHook {
    constructor () {
        this.tasks = []
    }
    tap (name, task) {
        this.tasks.push(task)
    }
    call (...args) { 
        let [first, ...others] = this.tasks;
        let res = first(...args);
        let paramter = res;
        others.reduce((a, b) => {
            if(!a) {
                a = paramter
            }
           return paramter = b(a) ? b(a) : paramter
        }, res)
    }
}

let s = new SyncWaterfallHook();

s.tap('node', function (data) {
    console.log('node', data)
    return 'node'
})
s.tap('react', function (data) {
    console.log('react', data)
})
s.tap('vue', function (data) {
    console.log('vue', data)
})
s.call('aa')