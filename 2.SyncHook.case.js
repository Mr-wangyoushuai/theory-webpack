class SyncHook {  // 同步钩子
    constructor (args) {
        this.tasks = [];
    }
    tap (name, task){
        console.log(name+ '-----------')
        this.tasks.push(task)
    }
    call (...args) {
        this.tasks.forEach((task => {
            task(...args)
        }))
    }
}

let hook = new SyncHook (['name'])

hook.tap('vnode', function (name) {
    console.log('vnode', name)
})
hook.tap('react', function (name) {
    console.log('react', name)
})
hook.call('aa','gg')