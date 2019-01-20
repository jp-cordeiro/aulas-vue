const taskList = {
    name: "tasks-list",
    template:`
    <div>
        <h1>{{title}}</h1>

        <hr>

        <h2>{{subtitle}}</h2>

        <div>  
            <button @click="addTask()">Add task</button>       
            <button @click="clearList()">Clear list</button>          
        </div>

        <div style="margin: .5rem">{{message}}</div>
        
        <div class="task-panel">
            <label for="taskInput" v-bind:value="task">Task</label>
            <input tabindex="1" type="text" placeholder="Task description" v-model="task" v-on:keyup.enter="addTask()">
        </div>

        <ul v-for="task in tasks">
            <li class="task-item">
                {{task}}
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
            tasks:[]
        }
    },
    methods:{
        addTask(){
            if(this.task == ''){
                alert('Please type one task.')
                return;
            }
            this.tasks.push(this.task)
            this.task = '';
        },
        clearList: function(){
            this.tasks = [];
        }
    },
    watch:{
        tasks(){
            this.message = this.tasks.length > 0 ? `${this.tasks.length} complete task(s)` : 'No tasks defined.'
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