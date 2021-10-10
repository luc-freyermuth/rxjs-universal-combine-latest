import { isObservable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { combineLatestFallbackWhenEmpty } from './rx.utils';
import { ExtractObservables } from './universal-combine-latest.types';

export function universalCombineLatest<T>(obj: T): Observable<ExtractObservables<T>> {
  if (isObservable(obj)) {
    return obj as Observable<ExtractObservables<T>>;
  }

  if (Array.isArray(obj)) {
    return combineLatestFallbackWhenEmpty(
      obj.map(arrayItem => universalCombineLatest(arrayItem))
    ) as Observable<ExtractObservables<T>>;
  }

  if (typeof obj === 'object' && obj !== null) {
    return combineLatestFallbackWhenEmpty(
      Object.entries(obj).map(([key, value]) => {
        return universalCombineLatest(value).pipe(map(v => ({ [key]: v })));
      })
    ).pipe(map(propsObservables => Object.assign({}, ...propsObservables))) as Observable<
      ExtractObservables<T>
    >;
  }

  return of(obj) as Observable<ExtractObservables<T>>;
}
