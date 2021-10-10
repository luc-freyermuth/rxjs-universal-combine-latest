import { Observable, isObservable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export const combineLatestFallbackWhenEmpty: typeof combineLatest = (observables: any) => {
  return observables.length ? (combineLatest(observables as any[]) as Observable<any>) : of([]);
};

export function universalCombineLatest(obj: any): Observable<any> {
  if (isObservable(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return combineLatestFallbackWhenEmpty(obj.map(arrayItem => universalCombineLatest(arrayItem)));
  }

  if (typeof obj === 'object') {
    return combineLatest(
      Object.entries(obj).map(([key, value]) => {
        return universalCombineLatest(value).pipe(map(v => ({ [key]: v })));
      })
    ).pipe(map(propsObservables => Object.assign({}, ...propsObservables)));
  }

  return of(obj);
}
