import { concat, Observable, Observer, queue, Subject } from "rxjs";
import { concatMap } from "rxjs/operators";

import { of, from } from 'rxjs';

export function ColdObservable() {

    // of
    const source = of(1, 2, 3, 4, 5);
    source.subscribe(val => console.log('of: ', val));
    const source_t1 = of([2, 3, 4, 5, 6]);
    source_t1.subscribe(val => console.log('of in Array: ', val));

    // myOf
    const source2 = myOf(6, 7, 8);
    source2.subscribe(val => console.log('myOf: ', val));
    const source2_t1 = myOf([12, 13, 14]);
    source2_t1.subscribe(val => console.log('myOf in Array: ', val));

    // from
    const fromtest = from([1, 2, 3, 4, 5]);
    fromtest.subscribe(val => console.log('from: ', val));

    // myFrom
    const myfromtest01 = myFrom([1, 2, 3, 4, 5]);
    myfromtest01.subscribe(val => console.log('myfrom: ', val));
}

// Custom 'of' operator
export const myOf = <Ar>(...values: Array<Ar>) => {
    return new Observable((observer: Observer<Ar>) => {
        values.forEach(val => observer.next(val));
        observer.complete();
    });
}

// Custom 'from' operator
export const myFrom = <Ar>(...values: Array<Array<Ar>>) => {
    return new Observable((observer: Observer<Ar>) => {
        values.forEach(val => {
            val.forEach(val => observer.next(val))
        });
    });
}

export function HotObservable() {






}





export function SubjectQueue () {


    let queue = new Subject();


}
