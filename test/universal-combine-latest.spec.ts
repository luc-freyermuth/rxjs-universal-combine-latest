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

  it('should combine an array of observables into a single observable of arrays', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const generatedObservable$ = universalCombineLatest([
        cold('a', { a: 1 }),
        cold('ab', { a: 1, b: 2 }),
      ]);

      expectObservable(generatedObservable$).toBe('ab', { a: [1, 1], b: [1, 2] });
    });
  });

  it('should combine an array of observables and non-observables into a single observable of arrays', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const generatedObservable$ = universalCombineLatest([
        cold('a', { a: 1 }),
        cold('ab', { a: 1, b: 2 }),
        42,
      ]);

      expectObservable(generatedObservable$).toBe('ab', { a: [1, 1, 42], b: [1, 2, 42] });
    });
  });

  it('should generate a synchronous observable of empty array when an empty array is inputed', () => {
    scheduler.run(({ expectObservable }) => {
      const generatedObservable$ = universalCombineLatest([]);

      expectObservable(generatedObservable$).toBe('(a|)', { a: [] });
    });
  });

  it('should combine an object of observables into an observable of objects of the same structure', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const generatedObservable$ = universalCombineLatest({
        x: cold('a', { a: 1 }),
        y: cold('ab', { a: 1, b: 2 }),
      });

      expectObservable(generatedObservable$).toBe('ab', { a: { x: 1, y: 1 }, b: { x: 1, y: 2 } });
    });
  });

  it('should combine an object of observables and non-observables into an observable of objects of the same structure', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const generatedObservable$ = universalCombineLatest({
        x: cold('a', { a: 1 }),
        y: cold('ab', { a: 1, b: 2 }),
        z: 42,
      });

      expectObservable(generatedObservable$).toBe('ab', {
        a: { x: 1, y: 1, z: 42 },
        b: { x: 1, y: 2, z: 42 },
      });
    });
  });

  it('should return a synchronous observable of empty objects when given an empty object', () => {
    scheduler.run(({ expectObservable }) => {
      const generatedObservable$ = universalCombineLatest({});

      expectObservable(generatedObservable$).toBe('(a|)', { a: {} });
    });
  });
});
