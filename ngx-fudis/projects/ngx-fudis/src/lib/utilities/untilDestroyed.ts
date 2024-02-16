import { inject, DestroyRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

// TODO: Write tests and internal documentation to this file why this is needed and for what it is used for.
export function untilDestroyed() {
  const subject = new Subject();

  inject(DestroyRef).onDestroy(() => {
    subject.next(true);
    subject.complete();
  });

  return <T>() => takeUntil<T>(subject.asObservable());
}
