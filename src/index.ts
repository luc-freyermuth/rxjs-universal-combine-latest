import { Observable, isObservable, of } from 'rxjs';

export function universalCombineLatest(obj: any): Observable<any> {
  return isObservable(obj) ? obj : of(obj);
}
