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
});
