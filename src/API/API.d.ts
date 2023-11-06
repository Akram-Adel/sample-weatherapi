/**
 * This guard takes a type and adds `null | undefined` to its type
 *
 * You can never trust API responses so we need to guard against the
 * response and assume that the response might contain `null | undefined`
 * values
 */
// prettier-ignore
export type APIGuard<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? APIGuard<U>[]
    : T[P] extends object ? APIGuard<T[P]>
    : T[P] | null;
};
