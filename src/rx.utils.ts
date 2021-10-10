import { Observable, of, combineLatest } from 'rxjs';

export const combineLatestFallbackWhenEmpty: typeof combineLatest = (observables: any) => {
  return observables.length ? (combineLatest(observables as any[]) as Observable<any>) : of([]);
};
