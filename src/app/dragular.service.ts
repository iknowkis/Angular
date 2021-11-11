import { Injectable } from '@angular/core';
import { TodoList} from 'src/app/item.model';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DragularService {
  
  constructor(private firestore: AngularFirestore
    ) { }

OrderedPostCollection = this.firestore.collection<TodoList>('kanban_board', (ref) =>
  ref.orderBy('date','desc') );
  
getTodoLists() {
    return this.OrderedPostCollection.snapshotChanges();
}

// 문서 id 불러오기
getSelectedTodoList(id: string){
  return this.firestore
  .collection<TodoList>('kanban_board')
  .doc(id)
  .valueChanges();
}

deleteTodoList(id: string){
    this.firestore
    .collection<TodoList>('kanban_board')
    .doc(id)
    .delete();
}

createTodoList(toDoList: TodoList){
  this.firestore.collection<TodoList>('kanban_board')
  .add({...toDoList,
    // date: firebase.default.firestore.FieldValue.serverTimestamp()
  });
}

updateTodoList(id: string, toDoList: TodoList){
  this.firestore.collection<TodoList>('kanban_board').doc(id)
  .update({...toDoList,
    // date: firebase.default.firestore.FieldValue.serverTimestamp()
  });
}
}

/*
// 댓글
getComments(id: any) {
    return this.firestore
      .collection('kanban_board')
      .doc(id)
      .collection<Comments>('Mycomment', (ref) =>
      ref.orderBy('date') ).snapshotChanges();
}

AddComment(id: string, comments: Comments) {
  this.firestore
  .collection('kanban_board')
  .doc(id)
  .collection('Mycomment')
  .add({...comments,
    date: firebase.default.firestore.FieldValue.serverTimestamp()
  });
}

deleteComment(PostId: string, CommentId: string){
  this.firestore
  .collection('kanban_board')
  .doc(PostId)
  .collection('Mycomment')
  .doc(CommentId)
  .delete();
}
/*

/* post-detail할 때 표시 방법 중 하나
  this.firestore.collection<Post>('kanban_board').snapshotChanges()
  .pipe(
       tap(list => this.list = list)
       );
*/