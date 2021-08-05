// import { Component, OnInit } from '@angular/core';
// import { TestBed } from '@angular/core/testing';
// import { Observable, Subject, timer } from 'rxjs';
// import { concatMap, finalize, map, mapTo, tap } from 'rxjs/operators';
// import { ColdObservable, HotObservable } from './observable/rxjs-observable';

// @Component({
//   selector: 'app-rxjs',
//   templateUrl: './rxjs.component.html',
//   styleUrls: ['./rxjs.component.css']
// })
// export class RxjsComponent implements OnInit {

//   constructor() {
//     // console.time(undefined);

//     // for (let i in [1, 2, 3]) {
//     //   console.timeLog(undefined, `item${i} is enqueued`);
//     //   queue.enqueue(() => {
//     //     return new Promise(res => {
//     //       console.timeLog(undefined, `item${i} is started`);
//     //       setTimeout(() => {
//     //         console.timeLog(undefined, `item${i} is finished`);
//     //         res(null);
//     //       }, 2000);
//     //     });
//     //   });
//   }

//   ngOnInit(): void {
//     this.process();
//     // this.countdown();

//     // ColdObservalbe();
//     // HotObservable();

//   }

//   // Queue using subject                     
//   subjectQueue$ = new Subject<any>();
//   objectQueueCount: number = 0;
//   subjectQueueuCount: number = 1;

//   process() {
//     this.subjectQueue$.pipe(
//       finalize(() => console.log('Stopped')), // ?
//       concatMap(x => x))
//       .subscribe(x => {
//         console.log('[Processed]: ', x)
//       });
//   }

//   enqueue() {
//     const currentCount = this.subjectQueueuCount;
//     console.log('[EnQueue]: ', currentCount);
//     const subject = timer(1000)
//       .pipe(
//         map(x => currentCount));
//     this.subjectQueue$.next(subject);
//     this.subjectQueueuCount++;
//   }

//   getRandom(min: number, max: number) {
//     return Math.floor(Math.random() * (max - min)) + min;
//   }
// }

// export class ObjectQueue {
//   list: (() => Observable<any>)[] = [];
//   //promisechain to Observable ?
//   next() {
//     const first = this.list.shift(); //shift? map? push?
//     if (first) return first();
//     else return this.list.pop(); // 뭐로 Promise.resolve() 해야하나
//     console.log('RRR', this.list);
//     console.log('RRRRRRR', this.list.pop);
//     console.log('RRRRRRR', this.list.pop());
//   }
//   enqueue(item: () => Observable<any>) {
//     this.list.push(item);
//     (() => this.next())
//   }
// }

// export class Queue {
//   list: (() => Promise<any>)[] = [];
//   promiseChain = Promise.resolve();
//   next() {
//     const first = this.list.shift();

//     // console.log('FF6', this.list);
//     if (first) return first();
//     else return Promise.resolve();
//   }
//   enqueue(item: () => Promise<any>) {
//     this.list.push(item);
//     this.promiseChain = this.promiseChain.then(() => this.next())
//   }
// }


import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, Subject, timer } from 'rxjs';
import { concatMap, delay, finalize, map, mapTo, share, startWith, tap } from 'rxjs/operators';
import { ColdObservable, HotObservable } from './observable/rxjs-observable';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() {
    // console.time(undefined);

    // for (let i in [1, 2, 3]) {
    //   console.timeLog(undefined, `item${i} is enqueued`);
    //   queue.enqueue(() => {
    //     return new Promise(res => {
    //       console.timeLog(undefined, `item${i} is started`);
    //       setTimeout(() => {
    //         console.timeLog(undefined, `item${i} is finished`);
    //         res(null);
    //       }, 2000);
    //     });
    //   });
    
// ##### item 0 started ?
    const queue = new Queue();

for(let i in [0,1,2]) {
    console.log(`item ${i} enqueued`)
    const action = timer(3000).pipe(
        startWith(`item ${i} started`),
    );
    queue.enqueue(action).subscribe({
        complete:()=>console.log(`item ${i} finished`)
    });
  }
}

  ngOnInit(): void {
    this.process();
    // ColdObservalbe();
    // HotObservable();
  }

  // Queue using subject                     
  subjectQueue$ = new Subject<any>();
  subjectQueueuCount: number = 1;

  process() {
    this.subjectQueue$
      .pipe(
        concatMap((x) =>
          timer(1000)
            .pipe(map(() => x)))
      )
      .subscribe(x => {
        if(x<this.subjectQueueuCount)
        console.log('Finished: ', x)
        if (!(x==this.subjectQueueuCount-1))
        console.log('Run: ', this.subjectQueueuCount)
      });
  }

  enqueue() {
    const currentCount = this.subjectQueueuCount;
    console.log('EnQueue: ', currentCount);
    this.subjectQueue$.next(currentCount);
    this.subjectQueueuCount++;
  }

  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export class ObjectQueue {
  list: (() => Observable<any>)[] = [];
  //promisechain to Observable ?
  next() {
    const first = this.list.shift(); //shift? map? push?
    if (first) return first();
    else return this.list.pop(); // 뭐로 Promise.resolve() 해야하나
    console.log('RRR', this.list);
    console.log('RRRRRRR', this.list.pop);
    console.log('RRRRRRR', this.list.pop());
  }
  enqueue(item: () => Observable<any>) {
    this.list.push(item);
    (() => this.next())
  }
}

class Queue {
  _queue = new Subject<{action:Observable<any>, watcher:Subject<any>}>();
  constructor () {
      this._queue
      .pipe(
          concatMap(({action, watcher})=>{
              return action.pipe(tap(watcher))
          })
      )
      .subscribe(console.log);

  }
  enqueue (action:Observable<any>) {
      const watcher = new Subject();
      this._queue.next({action, watcher});
      watcher.subscribe(e=>console.log(e));
      return watcher;
  }
}