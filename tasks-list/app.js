const taskList = {
    name: "tasks-list",
    template:`
    <div>
        <h1>{{title}}</h1>

        <hr>

        <h2>{{subtitle}}</h2>

        <div>  
            <button @click="addTask()">Add task</button> 
            <button @click="removeTask()">Remove task</button> 
            <button @click="invertOrderList()">Invert order list</button>    
            <button @click="clearList()">Clear list</button>          
        </div>

        <div style="margin: .5rem">{{message}}</div>
        
        <div class="task-panel">
            <label for="taskInput" v-bind:value="task">Task</label>
            <input tabindex="1" type="text" placeholder="Task description" v-model="task" v-on:keyup.enter="addTask()">
        </div>

        <ul ref="tasksList">
            <li v-for="(task,key) in tasks" v-bind:id="key" ref="taskItem" @click="addToCache($event)" class="task-item">
                {{key + 1}} - {{task}}
            </li>
        </ul>
        
        
    </div>
    `,
    data(){
        return{
            title: 'Tasks Lits',
            subtitle: "Set a description",
            message:'',
            task:'',
            tasks:[],
            cacheTask:false
        }
    },
    methods:{
        addTask(){
            if(this.task == ''){
                alert('Please type one task.')
                return;
            }
            this.tasks.push(this.task)
        },
        addToCache(event){
            this.cacheTask = event.target
        },
        removeTask(){
            this.tasks.length != 0 ? this.tasks.splice(this.cacheTask.id,1) : alert('The list is empty')
        },
        invertOrderList(){
            if(this.tasks.length > 1){
                this.tasks.reverse()
            }
        },
        clearList: function(){
            this.tasks = [];
        }
    },
    watch:{
        tasks(){
            this.message = this.tasks.length > 0 ? `${this.tasks.length} complete task(s)` : 'No tasks defined.'
            this.task = '';
        },
        cacheTask(newEvent,oldEvent){
            if(oldEvent){
                oldEvent.classList.remove('selected')
            }
            newEvent.classList.add('selected')
        }
    },
    mounted() {
        // setInterval(()=>{
        //     this.tasks.push(`Task ${this.tasks.length + 1} - This is a test`)
        // },3000)
    }
}

Vue.component('tasks-list',taskList);

const vm = new Vue({
    el:'#app',
    component:{
        taskList
    }
})