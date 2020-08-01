import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToDoService } from '../todo.service';
import { ToDo } from '../todo.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-todo-create',
    templateUrl: './todo-create.component.html',
    styleUrls: ['./todo-create.component.css']
})
export class ToDoCreateComponent{
    isLoading = false;
    private taskId: string;
    constructor(public todoService: ToDoService){}

    onSaveTask(form: NgForm){
        if(form.invalid){
            /// if invalid return back 
            return;
        }
        this.isLoading = true;
        this.todoService.addTask(form.value.task);
        // add task in task service
        form.resetForm(); // reset form inputs 
    }
}