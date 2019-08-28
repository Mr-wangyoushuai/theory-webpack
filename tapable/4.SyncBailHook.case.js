class SyncBailHook {
    constructor(...args){
        this.tasks = [];
        this.len = args.length;
    }
    tap(name, task){
        this.tasks.push(task)
    }
    call(...args) {
        console.log(args)
        let parameter = Array.prototype.slice.call(args,0,this.len)
        console.log(parameter)
        let res, index=0;
        do{
            res = this.tasks[index++](...parameter)
        }while(res == undefined && index<this.tasks.length)
    }
}

let s = new SyncBailHook(['name']);
s.tap('node', function (data, data2) {
    console.log('node', data, data2)
    return undefined
})
s.tap('react', function (data) {
    console.log('react', data)
    return 2
})
s.tap('vue', function (data) {
    console.log('vue', data)
})
s.call('aaa', 'bb')
