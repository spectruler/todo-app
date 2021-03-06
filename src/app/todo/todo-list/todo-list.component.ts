import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { ToDo } from '../todo.model';
import { ToDoService } from '../todo.service';


@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class ToDoListComponent implements OnInit, OnDestroy{
    displayedColumns: string[] = ['task','complete','actions']
    // tasks : ToDo[] = [{id: null, task: 'This is task1', complete: true}];
    tasks: ToDo[] = [];
    isLoading = false;

    private todosSub: Subscription;

    constructor(public todosService: ToDoService){}

    ngOnInit(){
        this.isLoading = true;
        this.todosService.getTasks();
         this.todosSub = this.todosService.getTaskUpdateListener()
         .subscribe((todos: ToDo[])=>{
             this.isLoading = false;
            this.tasks = todos;
         });
        //  console.log(this.tasks)
    }

    updateComplete(id: string, event){
        // console.log( event.target.checked);
        this.todosService.updateComplete(id,event.target.checked);
    }

    onDelete(todoId: string){
        this.todosService.deleteTask(todoId)
    }

    ngOnDestroy(){
        this.todosSub.unsubscribe();
    }



}