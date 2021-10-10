import { Observable, isObservable, of, combineLatest } from 'rxjs';

export function universalCombineLatest(obj: any): Observable<any> {
  if (Array.isArray(obj)) {
    return combineLatest(obj.map(arrayItem => universalCombineLatest(arrayItem)));
  }
  return isObservable(obj) ? obj : of(obj);
}
