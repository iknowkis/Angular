import { Component, Input, OnInit } from '@angular/core';

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