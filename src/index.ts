import { Observable, isObservable, of, combineLatest } from 'rxjs';

export const combineLatestFallbackWhenEmpty: typeof combineLatest = (observables: any) => {
  return observables.length ? (combineLatest(observables as any[]) as Observable<any>) : of([]);
};

export function universalCombineLatest(obj: any): Observable<any> {
  if (Array.isArray(obj)) {
    return combineLatestFallbackWhenEmpty(obj.map(arrayItem => universalCombineLatest(arrayItem)));
  }
  return isObservable(obj) ? obj : of(obj);
}
