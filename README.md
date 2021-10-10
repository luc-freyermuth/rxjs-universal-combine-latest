# `universalCombineLatest` generator function for rxjs

An rxjs generator similar to `combineLatest` that accepts any object as an input. 

It combines all observables found in the object and generates an observable of objects of the same structure.

It is very useful to generate complex observables by combining multiple sources while keeping readability and avoiding nesting `combineLatest` operators 

## How to install

```
npm install rxjs-universal-combine-latest
```

## Examples

```ts
import { of } from 'rxjs';
import { universalCombineLatest } from 'rxjs-universal-combine-latest';

// works with objects
const first$ = universalCombineLatest({ name: of('Krauss'), age: of(52) });
// will emit :
// { name: 'Krauss', age: 52 }

// still works with arrays
const middle$ = universalCombineLatest([ of('Eva'), of('Rudolf') ]);
// will emit :
// ['Eva', 'Rudolf']

// all values in the source object do not have to be observables !
const last$ = universalCombineLatest({ name: of('Rosa'), age: 35 });
// will emit :
// { name: 'Rosa', age: 35 }

// objects and arrays can be deeply nested
const family$ = universalCombineLatest(
    { 
        name: of('Kinzo'), 
        age: 'old', 
        children: [
            {
                name: 'Kraus'
            },
            {
                name: of('Eva')
            }
        ]
    }
);
// will emit :
// { 
//      name: 'Kinzo', 
//      age: 'old', 
//      children: [
//          {
//              name: 'Kraus'
//          },
//          {
//              name: 'Eva'
//          }
//      ]
// }

// In a similar way to combineLatest, it will emit every time an observable emits after they all have emited at least once
const aging$ = universalCombineLatest({ name: of('Rosa'), age: interval(1000).pipe(map(i => 35 + i)) });
// will emit :
// after 1s: { name: 'Rosa', age: 35 }
// after 2s: { name: 'Rosa', age: 36 }
// after 3s: { name: 'Rosa', age: 37 }
// ...

// Empty array of objects will emit imediately
const empty$ = universalCombineLatest([]);
// will emit :
// [] 
// and complete imediately
const emptyObj$ = universalCombineLatest({});
// will emit :
// {}
// and complete imediately

// simple values generates observables that complete imediately
const singleValue$ = universalCombineLatest('Magical Gohda chef');
// will emit :
// 'Magical Gohda chef'
// and complete imediately

// single observables are not affected and returned as is
const beatoriche$ = universalCombineLatest(of('Beatrice'));
// will emit :
// 'Beatrice'
// and complete imediately because the source observables behaves like this
```