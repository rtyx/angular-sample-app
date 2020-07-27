import { FORBIDDEN, UNAUTHORIZED } from 'http-status-codes';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/internal/operators';

const getErrorMessage = (maxRetry: number) => `Tried to load resource over XHR for ${maxRetry} times without success. Giving up.`;

const DEFAULT_MAX_RETRIES = 5;
const DEFAULT_BACK_OFF = 1000;

export function retryWithBackOff(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES, backOffMs = DEFAULT_BACK_OFF) {
  let retries = maxRetry;

  return (src: Observable<any>) => src.pipe(
    retryWhen((errors: Observable<any>) => errors.pipe(
      mergeMap(error => {
        if (retries-- > 0 && error.status !== UNAUTHORIZED && error !== FORBIDDEN) {
          const backOffTime = delayMs + (maxRetry - retries) * backOffMs;
          return of(error).pipe(delay(backOffTime));
        } else {
          console.error(getErrorMessage(maxRetry));
          return throwError(error);
        }
      })
    ))
  );
}
