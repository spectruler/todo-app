import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ToDo } from './todo.model';
  
@Injectable({providedIn: 'root'})
export class ToDoService{
    private todos: ToDo[] = [];
    private todosUpdate = new Subject<ToDo[]> ();

    constructor(private http: HttpClient) {}

    getTasks(){
        this.http.get<{tasks:any}>('http://localhost:5000/todos/')
        .pipe(map((postData) => {
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
            console.log(this.todos);
            this.todosUpdate.next([...this.todos]);
        })
    }

    getTaskUpdateListener(){
        return this.todosUpdate.asObservable();
    }

    addTask( task: string){
        const todo: ToDo = {id: null, task: task, complete:false};
        this.http.post<{response:any}>('http://localhost:5000/todos/add',todo)
        .subscribe((responseData) => {
            const ids = responseData._id;
            todo.id = ids;
            console.log('todo',todo)
            this.todos.push(todo);
            this.todosUpdate.next([...this.todos]);
        })
    }

    deleteTask(taskId: string){
        this.http.delete('http://localhost:5000/todos/remove/'+taskId)
        .subscribe(()=>{
            const updatedTasks = this.todos.filter(todo => todo.id !== taskId);
            this.todos = updatedTasks;
            this.todosUpdate.next([...this.todos]);
        })
    }



}