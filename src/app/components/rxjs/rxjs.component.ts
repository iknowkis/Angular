// import { Component, OnInit } from '@angular/core';
// import { Observable, Subject, Subscription, timer } from 'rxjs';
// import { catchError, concatMap, finalize, map, retry, startWith, tap } from 'rxjs/operators';
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

//     // ##### item 0 started ?
//     // const queue = new Queue();
//     //
//     // for(let i in [0,1,2]) {
//     //     console.log(`item ${i} enqueued`)
//     //     const action = timer(3000).pipe(
//     //         startWith(`item ${i} started`),
//     //     );
//     //     queue.enqueue(action).subscribe({
//     //         complete:()=>console.log(`item ${i} finished`)
//     //     });
//     //   }
//   }

//   ngOnInit(): void {
//     this.process();
//     // ColdObservalbe();
//     // HotObservable();
//   }

//   /*
//   우선순위 처리
//   - object 사용 (item:subject<>, index:number)


//   에러 처리 - 에러 유발 시나리오
//   1. 초과?
//   2. 의도적 에러
//   */

//   subjectQueue$ = new Subject<any>();
//   subjectQueueCount: number = 1;
//   private subscription: Subscription = new Subscription;

//   ngOnDestroy() {
//     this.subscription.unsubscribe();
//   }

//   process() {
//     this.subscription = this.subjectQueue$
//       .pipe(
//         finalize(() => {
//           this.subjectQueue$.unsubscribe,
//             console.log('Done !')
//         }),
//         concatMap((x) => {
//           return console.log('- Started: ', x),
//             timer(2000)
//               .pipe(
//                 map(() => x));
//         })
//         // , retry(3),
//         // catchError(err => {
//         //   throw 'error in source. Details: ' + err;
//         // })
//       )
//       .subscribe(x => {
//         console.log('[Finished]: ', x);
//       })
//   }

//   unsubscribe() {
//     console.log('Stop subscribe !');
//     this.subjectQueue$.complete();
//   }

//   pause() {
//     console.log('Pause ongoing actions and thus pause the queue !');
//     this.subjectQueue$.complete();
//     this.subscription.unsubscribe();
//   }

//   reset() {
//     this.subjectQueue$.complete();
//     this.subscription.unsubscribe();
//     this.subjectQueue$ = new Subject<any>();
//     this.subjectQueueCount = 1;
//     this.subscription = new Subscription;
//     this.process();
//     console.log('Reset the queue !');
//   }

//   enqueue() {
//     const currentCount = this.subjectQueueCount;
//     console.log('EnQueue: ', currentCount);
//     this.subjectQueue$.next(currentCount);
//     this.subjectQueueCount++;
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
//   }
//   enqueue(item: () => Observable<any>) {
//     this.list.push(item);
//     (() => this.next())
//   }
// }

// class Queue {
//   _queue = new Subject<{ action: Observable<any>, watcher: Subject<any> }>();
//   constructor() {
//     this._queue
//       .pipe(
//         concatMap(({ action, watcher }) => {
//           return action.pipe(tap(watcher))
//         })
//       )
//       .subscribe(console.log);

//   }
//   enqueue(action: Observable<any>) {
//     const watcher = new Subject();
//     this._queue.next({ action, watcher });
//     watcher.subscribe(e => console.log(e));
//     return watcher;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { from, Observable, of, Subject, Subscription, throwError, timer } from 'rxjs';
import { catchError, concatMap, finalize, map, retry, startWith, tap } from 'rxjs/operators';
import { ColdObservable, HotObservable, SubjectQueue } from './observable/rxjs-observable';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() {
    // #### Using promise 코드
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

    // ##### 다니엘님 코드
    // const queue = new Queue();
    // let err = new Error('error')

    // for(let i of [0, err, 1,2 ]) {
    //     console.log(`item ${i} enqueued`)
    //     const action = timer(2000).pipe(
    //         startWith(`item ${i} started`),
    //     );
    //     queue.enqueue(action).subscribe({
    //         complete:()=>console.log(`item ${i} finished`)
    //     });
    //   }
  }

  ngOnInit(): void {
    this.process();
    // ColdObservalbe();
    // HotObservable();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subjectQueue$ = new Subject<any>();
  subjectQueueCount: number = 1;
  private subscription: Subscription = new Subscription;
  list = Array<any>();

  process() {
    // this.subjectQueue$.observers.sort();
    this.subscription = this.subjectQueue$
      .pipe(
        finalize(() => {
          this.subjectQueue$.complete();
          this.subjectQueue$.unsubscribe,
            console.log('Done !')
        }),
        concatMap((x) => {
          console.log(`--Started: ${this.list[x - 1][0]}, Priority level: ${this.list[x - 1][1]}]`);

          
          const action = timer(2000)
              .pipe(
                map(() => {
                  throw new Error('Error');
                  return x;
                }),
                tap({
                  error:(err)=>console.error(err),
                }),
                catchError(err => {
                  return of(x);
                })
              );
          return action;
        })
      )
      .subscribe(x => {
        console.log(`[finished: ${this.list[x - 1][0]}, Priority level: ${this.list[x - 1][1]}]`);
      })
  }

  unsubscribe() {
    console.log('Stop subscribe !');
    this.subjectQueue$.complete();
  }

  pause() {
    console.log('Pause ongoing actions and thus pause the queue !');
    this.subjectQueue$.complete();
    this.subscription.unsubscribe();
  }

  reset() {
    this.subjectQueue$.complete();
    this.subscription.unsubscribe();
    this.subjectQueue$ = new Subject<any>();
    this.subjectQueueCount = 1;
    this.subscription = new Subscription;
    this.list = Array<any>();
    this.process();
    console.log('Reset the queue !');
  }

  lowPriorityEnqueue() {
    this.enqueue(1);
  }

  highPriorityEnqueue() {
    this.enqueue(2);
  }

  enqueue(priority: number) {
    const currentCount = this.subjectQueueCount;
    this.list.push([currentCount, priority]);
    console.log(`EnQueue: ${this.list[currentCount - 1][0]}, Priority level: ${this.list[currentCount - 1][1]}`);
    this.list.sort(([a, b], [c, d]) => b - d);
    this.subjectQueue$.next(currentCount);
    this.subjectQueueCount++;
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
  }
  enqueue(item: () => Observable<any>) {
    this.list.push(item);
    (() => this.next())
  }
}

class Queue {
  _queue = new Subject<{ action: Observable<any>, watcher: Subject<any> }>();
  constructor() {
    this._queue
      .pipe(
        concatMap(({ action, watcher }) => {
          return action.pipe(tap(watcher))
        })
      )
      .subscribe();
  }
  enqueue(action: Observable<any>) {
    const watcher = new Subject();
    this._queue.next({ action, watcher });
    watcher.subscribe(e => console.log(e));
    return watcher;
  }
}
