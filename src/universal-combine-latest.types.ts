import { Observable } from 'rxjs';

type ExtractObservableType<T> = T extends Observable<infer U> ? U : T;

type ExtractObservableArrayTypes<T extends any[]> = T extends [
  infer O1,
  infer O2,
  infer O3,
  infer O4,
  infer O5,
  infer O6,
  infer O7,
  infer O8
]
  ? [
      ExtractObservables<O1>,
      ExtractObservables<O2>,
      ExtractObservables<O3>,
      ExtractObservables<O4>,
      ExtractObservables<O5>,
      ExtractObservables<O6>,
      ExtractObservables<O7>,
      ExtractObservables<O8>
    ]
  : T extends [infer O1, infer O2, infer O3, infer O4, infer O5, infer O6, infer O7]
  ? [
      ExtractObservables<O1>,
      ExtractObservables<O2>,
      ExtractObservables<O3>,
      ExtractObservables<O4>,
      ExtractObservables<O5>,
      ExtractObservables<O6>,
      ExtractObservables<O7>
    ]
  : T extends [infer O1, infer O2, infer O3, infer O4, infer O5, infer O6]
  ? [
      ExtractObservables<O1>,
      ExtractObservables<O2>,
      ExtractObservables<O3>,
      ExtractObservables<O4>,
      ExtractObservables<O5>,
      ExtractObservables<O6>
    ]
  : T extends [infer O1, infer O2, infer O3, infer O4, infer O5]
  ? [
      ExtractObservables<O1>,
      ExtractObservables<O2>,
      ExtractObservables<O3>,
      ExtractObservables<O4>,
      ExtractObservables<O5>
    ]
  : T extends [infer O1, infer O2, infer O3, infer O4]
  ? [ExtractObservables<O1>, ExtractObservables<O2>, ExtractObservables<O3>, ExtractObservables<O4>]
  : T extends [infer O1, infer O2, infer O3]
  ? [ExtractObservables<O1>, ExtractObservables<O2>, ExtractObservables<O3>]
  : T extends [infer O1, infer O2]
  ? [ExtractObservables<O1>, ExtractObservables<O2>]
  : T extends [infer O1]
  ? [ExtractObservables<O1>]
  : T extends (infer U)[]
  ? ExtractObservables<U>[]
  : never;

type ExtractObservableObjectTypes<T extends object> = {
  [K in keyof T]: ExtractObservables<T[K]>;
};

export type ExtractObservables<T> = T extends Observable<any>
  ? ExtractObservableType<T>
  : T extends any[]
  ? ExtractObservableArrayTypes<T>
  : T extends object
  ? ExtractObservableObjectTypes<T>
  : ExtractObservableType<T>;
