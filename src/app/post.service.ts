import { Injectable } from '@angular/core';
import { Post, Comments } from 'src/app/post.model';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

//import { Observable, of } from 'rxjs';
//import { tap } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor(private firestore: AngularFirestore
    ) { }

OrderedPostCollection = this.firestore.collection<Post>('board', (ref) =>
  ref.orderBy('date','desc') );
  
getPosts() {
    return this.OrderedPostCollection.snapshotChanges();
}

// 문서 id 불러오기
getSelectedPost(id: string){
  return this.firestore
  .collection<Post>('board')
  .doc(id)
  .valueChanges();
}

deletePost(id: string){
    this.firestore
    .collection<Post>('board')
    .doc(id)
    .delete();
}

createPost(post: Post){
  this.firestore.collection<Post>('board')
  .add({...post,
    date: firebase.default.firestore.FieldValue.serverTimestamp()
  });
}

updatePost(id: string, post: Post){
  this.firestore.collection<Post>('board').doc(id)
  .update({...post,
    date: firebase.default.firestore.FieldValue.serverTimestamp()
  });
}

// 댓글
getComments(id: any) {
    return this.firestore
      .collection('board')
      .doc(id)
      .collection<Comments>('Mycomment', (ref) =>
      ref.orderBy('date') ).snapshotChanges();
}

AddComment(id: string, comments: Comments) {
  this.firestore
  .collection('board')
  .doc(id)
  .collection('Mycomment')
  .add({...comments,
    date: firebase.default.firestore.FieldValue.serverTimestamp()
  });
}

deleteComment(PostId: string, CommentId: string){
  this.firestore
  .collection('board')
  .doc(PostId)
  .collection('Mycomment')
  .doc(CommentId)
  .delete();
}

/* post-detail할 때 표시 방법 중 하나
  this.firestore.collection<Post>('board').snapshotChanges()
  .pipe(
       tap(list => this.list = list)
       );
*/
}
