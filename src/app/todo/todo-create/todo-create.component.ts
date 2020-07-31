import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToDoService } from '../todo.service';

@Component({
    selector: 'app-todo-create',
    templateUrl: './todo-create.component.html',
    styleUrls: ['./todo-create.component.css']
})
export class ToDoCreateComponent{

    isLoading = false;
    constructor(public todoService: ToDoService){}

    onSaveTask(form: NgForm){
        if(form.invalid){
            /// if invalid return back 
            return;
        }
        // add task in task service
        this.todoService.addTask(form.value.task);
        form.resetForm(); // reset form inputs 
    }
}