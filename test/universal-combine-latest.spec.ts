import { universalCombineLatest } from '../src';
import { TestScheduler } from 'rxjs/testing';

describe('universalCombineLatest', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should return a single inputed observable unchanged', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const generatedObservable$ = universalCombineLatest(cold('a', { a: 1 }));

      expectObservable(generatedObservable$).toBe('a', { a: 1 });
    });
  });

  it('should return a synchronous observable when a non-observable value is inputed', () => {
    scheduler.run(({ expectObservable }) => {
      const generatedObservable$ = universalCombineLatest(1);

      expectObservable(generatedObservable$).toBe('(a|)', { a: 1 });
    });
  });

  it('should combine an array of observables into a single observable of array', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const generatedObservable$ = universalCombineLatest([
        cold('a', { a: 1 }),
        cold('ab', { a: 1, b: 2 }),
      ]);

      expectObservable(generatedObservable$).toBe('ab', { a: [1, 1], b: [1, 2] });
    });
  });
});
