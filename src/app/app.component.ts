import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public mode = 'list';
  public todos : Todo[] = [];
  public title :  String = "To do List!";
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });
    this.load();
  }

  alteraTexto(){
    this.title = 'Texto alterado!';
  }

  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push( new Todo(id, title, false));
    this.save();
    this.clear();
  }
  remove(todo: Todo){
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  load(){
    const data = localStorage.getItem('todos');
    if(data){
      this.todos = JSON.parse(data);
    }else{
      this.todos = []
    }
  }

  clear(){
    this.form.reset();
  }

  markAsDone(todo: Todo){
    todo.done = true;
    this.save();

  }
  
  markAsUndone(todo: Todo){
    todo.done = false;
    this.save();

  }

  save(){
    let data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
