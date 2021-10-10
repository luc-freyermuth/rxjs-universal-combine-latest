import { Observable, isObservable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { combineLatestFallbackWhenEmpty } from './rx.utils';

export function universalCombineLatest(obj: any): Observable<any> {
  if (isObservable(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return combineLatestFallbackWhenEmpty(obj.map(arrayItem => universalCombineLatest(arrayItem)));
  }

  if (typeof obj === 'object' && obj !== null) {
    return combineLatestFallbackWhenEmpty(
      Object.entries(obj).map(([key, value]) => {
        return universalCombineLatest(value).pipe(map(v => ({ [key]: v })));
      })
    ).pipe(map(propsObservables => Object.assign({}, ...propsObservables)));
  }

  return of(obj);
}
