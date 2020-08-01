import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToDoService } from '../todo.service';
import { ToDo } from '../todo.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-todo-edit',
    templateUrl: './todo-edit.component.html',
    styleUrls: ['./todo-edit.component.css']
})
export class ToDoEditComponent implements OnInit{
    todo: ToDo;
    isLoading = false;
    private taskId: string;
    constructor(public todoService: ToDoService, public route: ActivatedRoute){}

    ngOnInit(){
        this.route.paramMap.subscribe((paramMap: ParamMap)=>{
            if(paramMap.has('taskId')){
                this.taskId = paramMap.get('taskId'); 
                this.isLoading = true;
                this.todoService.getTask(this.taskId)
                .subscribe(taskData => {
                    this.isLoading = false;
                    this.todo = {id: taskData._id, task: taskData.task, complete: taskData.complete}
                })   
            }else{
                this.taskId = null;
            }
        })
    }

    onSaveTask(form: NgForm){
        if(form.invalid){
            /// if invalid return back 
            return;
        }
        this.isLoading = true;
        this.todoService.updateTask(this.taskId, form.value.task);
        // add task in task service
        form.resetForm(); // reset form inputs 
    }
}