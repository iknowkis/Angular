
import { Component, Input, OnInit } from '@angular/core';

// import { Kanban } from 'src/app/post.model';

@Component({
  selector: 'app-study-ng-for',
  templateUrl: './study-ng-for.component.html',
  styleUrls: ['./study-ng-for.component.css']
})
export class StudyNgForComponent implements OnInit {

  useTrackById = true;
  
  constructor() { }

  ngOnInit(): void {
    this.converted=this.toObject(this.toDoLists);
  }

  toDoLists = ["Lunch", "Chess","Wash"];

  converted!:{id:number,text:string}[];


  toDoListsCoveted !:object;

  helloToDoLists(event: any) {
    this.toDoLists=event.map((i:any) => i.text)
  }


  
  toObject(arr: string[]) {
   return arr.map((str: string, idx: number) => {
      return {
        id: idx,
        text: str
      }
    })
  }

  trackById(id: number, item: any) {
     return item.id
  };

  Add() {
    this.converted.push();
  }

  removevalue(i: number) {
    this.toDoLists.splice(i, 1);
  }
}

// 에러 상황시 문제 해결 구상 중
// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

// import { DragularService } from 'src/app/dragular.service';
// import { TodoList } from 'src/app/item.model';

// @Component({
//   selector: 'app-study-ng-for',
//   templateUrl: './study-ng-for.component.html',
//   styleUrls: ['./study-ng-for.component.css']
// })
// export class StudyNgForComponent implements OnInit {

//   toDoLists: any[] = [];
//   TodoListForm!: FormGroup;
//   converted = this.toDoLists
//   useTrackById = true;
  
//   constructor(
//     private postService: DragularService,
//     private formBuilder: FormBuilder,
//     private todoList: TodoList
//     ) { }

//     private initForm() {
//       this.TodoListForm = new FormGroup({
//         'toDoList': new FormControl(null, Validators.required),
//       });
//     }


//   ngOnInit(): void {
    
//     this.initForm();
//     this.converted=this.toObject(this.toDoLists);

//       this.postService.getTodoLists().subscribe(data => {
//           this.toDoLists = data.map((e: any) => {
//              return {
//                id:e.payload.doc.id,
//                ...e.payload.doc.data()
//              } as TodoList;
//         })
//       });
//   }

//   toObject(arr: string[]) {
//    return arr.map((str: string, idx: number) => {
//       return {
//         id: idx,
//         text: str
//       }
//     })
//   }

//   trackById(id: number, item: any) {
//      return item.id
//   };

//   addTodoListFunc() {
//     this.postService.createTodoList(this.TodoListForm.value);
//   }

//   deleteTodoListFunc(id: any) {
//     this.postService.deleteTodoList(id);
//   }
// }