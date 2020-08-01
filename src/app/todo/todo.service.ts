import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ToDo } from './todo.model';
import { Router } from '@angular/router';
  
@Injectable({providedIn: 'root'})
export class ToDoService{
    private todos: ToDo[] = [];
    private todosUpdate = new Subject<ToDo[]> ();

    constructor(private http: HttpClient, private router: Router) {}

    getTasks(){
        // get all uncompleted tasks
        this.http.get('http://localhost:5000/todos/')
        .pipe(map((postData:any) => {
            console.log(postData);
            return postData.map(t => {
                return {
                    task: t.task,
                    complete: t.complete,
                    id: t._id
                }
            })
        }))
        .subscribe((transformedTask) =>{
            this.todos = transformedTask;
            this.todosUpdate.next([...this.todos]);
        })
    }

    getTaskUpdateListener(){
        return this.todosUpdate.asObservable();
    }

    getTask(id: string){
        // get specific task
        return this.http.get<{_id: string, task: string, complete:boolean}>
        ("http://localhost:5000/todos/"+id)
    }

    addTask( task: string){
        // create new task
        const todo: ToDo = {id: null, task: task, complete:false};
        this.http.post<{todoId:string}>('http://localhost:5000/todos/add',todo)
        .subscribe((responseData) => {
            const ids = responseData.todoId;
            todo.id = ids;
            this.todos.push(todo);
            this.todosUpdate.next([...this.todos]);
            this.router.navigate(['/']);
        })
    }

    updateTask(id: string, task: string){
        // update task
        const todo = {id:id, task: task, complete: false}
        this.http.put('http://localhost:5000/todos/edit/'+id,{
            task:todo.task
        })
        .subscribe(response => {
            const updatedTodos = [...this.todos];
            const oldTodoIndex = updatedTodos.findIndex(t => t.id === todo.id)
            todo.complete = updatedTodos[oldTodoIndex].complete;
            updatedTodos[oldTodoIndex] = todo;
            this.todos = updatedTodos;
            this.todosUpdate.next([...this.todos]);
            this.router.navigate(['/']);
        })
    }

    updateComplete(id:string, complete: boolean){
        // update that task is completed 
        const todo = {id:id, task: '', complete: complete}
        this.http.put('http://localhost:5000/todos/edit/'+id,{
            complete:todo.complete
        })
        .subscribe(response => {
            const updatedTasks = this.todos.filter(todo => todo.id !== id);
            this.todos = updatedTasks;
            this.todosUpdate.next([...this.todos]);
        })
    }

    deleteTask(taskId: string){
        // delete specified task
        this.http.delete('http://localhost:5000/todos/remove/'+taskId)
        .subscribe(()=>{
            const updatedTasks = this.todos.filter(todo => todo.id !== taskId);
            this.todos = updatedTasks;
            this.todosUpdate.next([...this.todos]);
        })
    }
}